// ============================================================
// Fitness RPG - app-pwa.js
// ------------------------------------------------------------
// Installation PWA, disponibilité hors ligne et mises à jour.
// Ce module ne lit ni ne modifie les données sportives.
// ============================================================

(function initializePwaModule() {
  "use strict";

  const INSTALL_GUIDE_DISMISSED_KEY = "fitnessRpgPwaInstallGuideDismissed";
  const UPDATE_CHECK_INTERVAL_MS = 15 * 60 * 1000;
  function compareVersions(a, b) {
    const parse = (value) => {
      const raw = String(value || "").replace(/^v/i, "");
      if (!/^\d+(?:\.\d+)*$/.test(raw)) return null;
      return raw.split(".").map(Number);
    };
    const left = parse(a), right = parse(b);
    if (!left || !right) return 0;
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const diff = (left[i] || 0) - (right[i] || 0);
      if (diff) return Math.sign(diff);
    }
    return 0;
  }

  function readInstallDismissed() {
    try {
      return window.localStorage.getItem(INSTALL_GUIDE_DISMISSED_KEY) === "1";
    } catch {
      return false;
    }
  }

  function rememberInstallDismissed() {
    try {
      window.localStorage.setItem(INSTALL_GUIDE_DISMISSED_KEY, "1");
    } catch {
      // La navigation privée ne doit pas bloquer le fonctionnement PWA.
    }
  }

  const pwa = {
    registration: null,
    deferredInstallPrompt: null,
    waitingWorker: null,
    activePrompt: null,
    installDismissed: readInstallDismissed(),
    updateDismissed: false,
    availableVersion: null,
    releaseNotes: null,
    updateCheckInProgress: false,
    newControllerReady: false,
    reloadPending: false,
    hadControllerAtStart: Boolean(navigator.serviceWorker?.controller),
    statusTimeoutId: null,
    sessionWatchId: null,
    updateCheckId: null
  };

  window.FitnessRpgPwa = pwa;
  pwa.compareVersions = compareVersions;
  pwa.getCurrentVersion = () => String(window.FitnessRpgConfig?.assetVersion || "").trim();
  pwa.isUpdateAvailable = () => Boolean(
    pwa.waitingWorker || pwa.newControllerReady ||
    (pwa.availableVersion && compareVersions(pwa.availableVersion, pwa.getCurrentVersion()) > 0)
  );

  pwa.getElements = function getElements() {
    return {
      prompt: document.querySelector("#pwaPrompt"),
      icon: document.querySelector("#pwaPromptIcon"),
      title: document.querySelector("#pwaPromptTitle"),
      message: document.querySelector("#pwaPromptMessage"),
      primary: document.querySelector("#pwaPromptPrimaryButton"),
      dismiss: document.querySelector("#pwaPromptDismissButton"),
      status: document.querySelector("#pwaConnectionStatus"),
      updateButton: document.querySelector("#pwaUpdateButton")
    };
  };

  pwa.isStandalone = function isStandalone() {
    return window.matchMedia?.("(display-mode: standalone)")?.matches
      || window.navigator.standalone === true;
  };

  pwa.hasActiveWorkout = function hasActiveWorkout() {
    const activeProgramSession = window.FitnessRpgState?.getActiveProgramSession?.();
    const activeTimerSession = window.FitnessRpgState?.getActiveTimerSession?.();
    const activeTimerPhases = ["countdown", "running", "paused"];

    return Boolean(
      activeProgramSession
      || activeTimerPhases.includes(activeTimerSession?.phase)
    );
  };

  pwa.hidePrompt = function hidePrompt() {
    const { prompt } = pwa.getElements();

    prompt?.classList.add("hidden");
    prompt?.setAttribute("aria-hidden", "true");
    pwa.activePrompt = null;
  };

  pwa.refreshUpdateButton = function refreshUpdateButton() {
    const { updateButton } = pwa.getElements();
    if (!updateButton) return;
    const hasUpdate = pwa.isUpdateAvailable();
    const workout = pwa.hasActiveWorkout();
    updateButton.classList.toggle("hidden", !hasUpdate);
    updateButton.disabled = Boolean(hasUpdate && workout);
    updateButton.title = workout
      ? "Mise à jour possible après la séance"
      : "Installer la nouvelle version de Fitness RPG";
    updateButton.setAttribute("aria-label", updateButton.title);
  };

  pwa.showPrompt = function showPrompt(options) {
    const {
      prompt,
      icon,
      title,
      message,
      primary,
      dismiss
    } = pwa.getElements();

    if (!prompt || !icon || !title || !message || !primary || !dismiss) return;

    pwa.activePrompt = options.mode;
    prompt.dataset.mode = options.mode;
    icon.textContent = options.icon;
    title.textContent = options.title;
    message.textContent = options.message;
    primary.textContent = options.primaryLabel;
    primary.dataset.pwaAction = options.primaryAction;
    primary.disabled = Boolean(options.primaryDisabled);
    dismiss.textContent = options.dismissLabel || "Plus tard";
    dismiss.dataset.pwaAction = "dismiss";
    prompt.classList.remove("hidden");
    prompt.setAttribute("aria-hidden", "false");
  };

  pwa.showInstallPrompt = function showInstallPrompt() {
    if (
      !pwa.deferredInstallPrompt
      || pwa.installDismissed
      || pwa.isStandalone()
      || pwa.waitingWorker
      || pwa.newControllerReady
      || pwa.isUpdateAvailable()
    ) {
      return;
    }

    pwa.showPrompt({
      mode: "install",
      icon: "🛡️",
      title: "Installer Fitness RPG",
      message: "Ajoute l’application à l’écran d’accueil pour la lancer comme une vraie application mobile.",
      primaryLabel: "Installer",
      primaryAction: "install"
    });
  };

  pwa.getManualInstallMessage = function getManualInstallMessage() {
    const userAgent = window.navigator.userAgent || "";

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "Sur iPhone ou iPad, ouvre le menu Partager du navigateur puis « Sur l’écran d’accueil ».";
    }

    if (/Android/i.test(userAgent)) {
      return "Sur Android, ouvre le menu ⋮ ou ≡ du navigateur puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».";
    }

    return "Sur ordinateur, ouvre le menu du navigateur (⋮ dans Chrome ou Edge) et cherche « Installer Fitness RPG » ou « Installer cette page en tant qu’application ».";
  };

  // Certains navigateurs ne déclenchent jamais beforeinstallprompt,
  // même si l'installation depuis leur menu reste possible.
  pwa.showManualInstallPrompt = function showManualInstallPrompt() {
    if (pwa.isStandalone() || pwa.isUpdateAvailable()) return;

    pwa.showPrompt({
      mode: "manual",
      icon: "📲",
      title: "Installer Fitness RPG",
      message: pwa.getManualInstallMessage(),
      primaryLabel: "Compris",
      primaryAction: "ack-install",
      dismissLabel: "Plus tard"
    });
  };

  pwa.openInstallHelp = function openInstallHelp() {
    if (pwa.isStandalone()) {
      pwa.showConnectionStatus("Fitness RPG est déjà ouverte comme application.", "online");
      return;
    }

    if (pwa.isUpdateAvailable()) {
      pwa.showUpdatePrompt();
      return;
    }

    pwa.installDismissed = false;
    if (pwa.deferredInstallPrompt) {
      pwa.showInstallPrompt();
    } else {
      pwa.showManualInstallPrompt();
    }
  };

  pwa.showUpdatePrompt = function showUpdatePrompt() {
    pwa.refreshUpdateButton();
    if (!pwa.isUpdateAvailable() || pwa.updateDismissed) return;
    const activeWorkout = pwa.hasActiveWorkout();
    const current = pwa.getCurrentVersion();
    const target = pwa.availableVersion;
    const versionText = target && compareVersions(target, current) > 0
      ? `Version ${current} → ${target}.`
      : `Version installée : ${current}.`;
    pwa.showPrompt({
      mode: "update",
      icon: "✨",
      title: "Nouvelle mise à jour disponible",
      message: activeWorkout
        ? `${versionText} Termine ta séance avant de l’installer. Ta progression reste sauvegardée.`
        : `${versionText} ${pwa.releaseNotes ? pwa.releaseNotes + " " : ""}Tes sauvegardes seront conservées.`,
      primaryLabel: activeWorkout ? "Après la séance" : "Installer MAJ",
      primaryAction: "update",
      primaryDisabled: activeWorkout
    });
  };

  pwa.refreshPrompt = function refreshPrompt() {
    pwa.refreshUpdateButton();
    if (pwa.isUpdateAvailable()) {
      pwa.showUpdatePrompt();
      return;
    }

    if (pwa.deferredInstallPrompt) {
      pwa.showInstallPrompt();
      return;
    }

    if (pwa.activePrompt === "manual" && !pwa.isStandalone()) return;
    pwa.hidePrompt();
  };

  pwa.showConnectionStatus = function showConnectionStatus(message, tone, persistent = false) {
    const { status } = pwa.getElements();
    if (!status) return;

    window.clearTimeout(pwa.statusTimeoutId);
    status.textContent = message;
    status.className = `pwa-connection-status is-${tone}`;
    status.classList.remove("hidden");

    if (!persistent) {
      pwa.statusTimeoutId = window.setTimeout(() => {
        status.classList.add("hidden");
      }, 3500);
    }
  };

  pwa.promptInstall = async function promptInstall() {
    const installPrompt = pwa.deferredInstallPrompt;
    if (!installPrompt) {
      pwa.openInstallHelp();
      return;
    }

    pwa.deferredInstallPrompt = null;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;

      if (choice?.outcome !== "accepted") {
        pwa.installDismissed = true;
        rememberInstallDismissed();
      }
      pwa.hidePrompt();
    } catch (error) {
      console.warn("Fitness RPG : installation directe indisponible.", error);
      pwa.showManualInstallPrompt();
    }
  };

  pwa.applyUpdate = function applyUpdate() {
    if (pwa.hasActiveWorkout()) {
      pwa.showUpdatePrompt();
      return;
    }

    if (pwa.newControllerReady) {
      window.location.reload();
      return;
    }

    // Secours si le navigateur n'a pas encore de nouveau worker en attente.
    if (!pwa.waitingWorker && pwa.availableVersion &&
        compareVersions(pwa.availableVersion, pwa.getCurrentVersion()) > 0) {
      const url = new URL(window.location.href);
      url.searchParams.set("maj", pwa.availableVersion);
      window.location.replace(url.toString());
      return;
    }

    if (!pwa.waitingWorker) return;

    const { primary } = pwa.getElements();
    if (primary) {
      primary.disabled = true;
      primary.textContent = "Mise à jour…";
    }

    pwa.reloadPending = true;
    pwa.waitingWorker.postMessage({ type: "SKIP_WAITING" });
  };

  pwa.handleAction = function handleAction(action) {
    if (action === "install") {
      void pwa.promptInstall();
      return;
    }

    if (action === "update") {
      pwa.applyUpdate();
      return;
    }

    if (action === "check-update") {
      window.FitnessRpgNavigation?.closeMobileMorePanel?.({ restoreFocus: false });
      void pwa.checkForUpdate(true);
      return;
    }

    if (action === "show-install") {
      window.FitnessRpgNavigation?.closeMobileMorePanel?.({ restoreFocus: false });
      pwa.openInstallHelp();
      return;
    }

    if (action === "ack-install") {
      pwa.installDismissed = true;
      rememberInstallDismissed();
      pwa.hidePrompt();
      return;
    }

    if (action === "dismiss") {
      if (pwa.activePrompt === "update") {
        pwa.updateDismissed = true;
      } else if (pwa.activePrompt === "install" || pwa.activePrompt === "manual") {
        pwa.installDismissed = true;
        rememberInstallDismissed();
      }

      pwa.hidePrompt();
    }
  };

  pwa.watchInstallingWorker = function watchInstallingWorker(worker) {
    if (!worker) return;

    worker.addEventListener("statechange", () => {
      if (worker.state !== "installed" || !navigator.serviceWorker.controller) return;

      pwa.waitingWorker = pwa.registration?.waiting || worker;
      pwa.updateDismissed = false;
      pwa.refreshPrompt();
    });
  };

  pwa.observeRegistration = function observeRegistration(registration) {
    pwa.registration = registration;
    pwa.waitingWorker = registration.waiting;

    if (registration.installing) {
      pwa.watchInstallingWorker(registration.installing);
    }

    if (pwa.waitingWorker) {
      pwa.updateDismissed = false;
      pwa.refreshPrompt();
    }

    registration.addEventListener("updatefound", () => {
      pwa.watchInstallingWorker(registration.installing);
    });
  };

  pwa.checkForUpdate = async function checkForUpdate(manual = false) {
    if (!navigator.onLine) {
      if (manual) pwa.showConnectionStatus("Connexion nécessaire pour vérifier les MAJ.", "offline");
      return false;
    }
    if (pwa.updateCheckInProgress) return false;
    pwa.updateCheckInProgress = true;
    // Même si version.json est momentanément indisponible, la vérification
    // native du service worker doit toujours être exécutée.
    const workerCheck = pwa.registration?.update?.().catch(() => undefined);
    try {
      // Comparaison avec le manifeste réseau, sans utiliser un cache éventuellement périmé.
      const url = new URL("./version.json", window.location.href);
      url.searchParams.set("_", String(Date.now()));
      const response = await fetch(url.toString(), { cache: "no-store" });
      if (!response.ok) throw new Error("Version distante indisponible");
      const release = await response.json();
      const nextVersion = String(release?.version || "");
      if (!/^\d+(?:\.\d+)*$/.test(nextVersion)) {
        throw new Error("Format de version distante invalide");
      }

      // Signaler rapidement la MAJ ; la vérification du worker suit en parallèle.
      if (compareVersions(nextVersion, pwa.getCurrentVersion()) > 0) {
        if (pwa.availableVersion !== nextVersion) pwa.updateDismissed = false;
        pwa.availableVersion = nextVersion;
        pwa.releaseNotes = String(release?.notes || "").slice(0, 180);
      } else {
        pwa.availableVersion = null;
        pwa.releaseNotes = null;
      }
      pwa.refreshPrompt();
      await workerCheck;
      if (manual && !pwa.isUpdateAvailable()) {
        pwa.showConnectionStatus(`Fitness RPG ${pwa.getCurrentVersion()} : déjà à jour.`, "online");
      }
      return pwa.isUpdateAvailable();
    } catch (error) {
      await workerCheck;
      console.warn("Fitness RPG : contrôle de version indisponible.", error);
      if (manual) pwa.showConnectionStatus("Impossible de vérifier les MAJ pour le moment.", "offline");
      // Une MAJ du worker reste exploitable même sans réponse du manifeste.
      pwa.refreshPrompt();
      return pwa.isUpdateAvailable();
    } finally {
      pwa.updateCheckInProgress = false;
    }
  };

  pwa.registerServiceWorker = async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    const isSecureOrigin = window.isSecureContext
      || ["localhost", "127.0.0.1"].includes(window.location.hostname);

    if (!isSecureOrigin) return;

    try {
      const registration = await navigator.serviceWorker.register("./service-worker.js", {
        scope: "./",
        updateViaCache: "none"
      });

      pwa.observeRegistration(registration);
      void pwa.checkForUpdate();
    } catch (error) {
      console.warn("Fitness RPG : service worker indisponible.", error);
    }
  };

  pwa.init = function initPwa() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      pwa.deferredInstallPrompt = event;
      pwa.installDismissed = readInstallDismissed();
      pwa.refreshPrompt();
    });

    window.addEventListener("appinstalled", () => {
      pwa.deferredInstallPrompt = null;
      pwa.installDismissed = true;
      rememberInstallDismissed();
      pwa.hidePrompt();
      pwa.showConnectionStatus("Fitness RPG est installée.", "online");
    });

    window.addEventListener("online", () => {
      pwa.showConnectionStatus("Connexion rétablie.", "online");
      void pwa.checkForUpdate();
    });

    window.addEventListener("offline", () => {
      pwa.showConnectionStatus("Mode hors connexion.", "offline", true);
    });

    navigator.serviceWorker?.addEventListener("controllerchange", () => {
      if (!pwa.hadControllerAtStart) {
        pwa.hadControllerAtStart = true;
        return;
      }

      if (!pwa.hasActiveWorkout()) {
        window.location.reload();
        return;
      }
      pwa.reloadPending = false;

      pwa.waitingWorker = null;
      pwa.newControllerReady = true;
      pwa.updateDismissed = false;
      pwa.showUpdatePrompt();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        void pwa.checkForUpdate();
        pwa.refreshPrompt();
      }
    });

    window.addEventListener("storage", () => {
      if (pwa.activePrompt === "update") {
        pwa.showUpdatePrompt();
      }
    });

    pwa.sessionWatchId = window.setInterval(() => {
      pwa.refreshUpdateButton();
      if (pwa.activePrompt === "update") {
        pwa.showUpdatePrompt();
      }
    }, 15000);

    pwa.updateCheckId = window.setInterval(() => {
      void pwa.checkForUpdate();
    }, UPDATE_CHECK_INTERVAL_MS);

    if (!navigator.onLine) {
      pwa.showConnectionStatus("Mode hors connexion.", "offline", true);
    }

    void pwa.registerServiceWorker();

    // Invitation de secours pour les navigateurs sans fenêtre d'installation.
    // Affichée au plus une fois, puis accessible via « Plus > Installer l'appli ».
    window.setTimeout(() => {
      if (
        pwa.installDismissed
        || pwa.deferredInstallPrompt
        || pwa.waitingWorker
        || pwa.newControllerReady
        || pwa.isUpdateAvailable()
        || pwa.isStandalone()
        || pwa.hasActiveWorkout()
        || navigator.onLine === false
      ) {
        return;
      }
      pwa.showManualInstallPrompt();
    }, 2500);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", pwa.init);
  } else {
    pwa.init();
  }
}());
