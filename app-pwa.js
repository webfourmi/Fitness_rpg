// ============================================================
// Fitness RPG - app-pwa.js
// ------------------------------------------------------------
// Installation PWA, disponibilité hors ligne et mises à jour.
// Ce module ne lit ni ne modifie les données sportives.
// ============================================================

(function initializePwaModule() {
  "use strict";

  const INSTALL_GUIDE_DISMISSED_KEY = "fitnessRpgPwaInstallGuideDismissed";

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
    newControllerReady: false,
    reloadPending: false,
    hadControllerAtStart: Boolean(navigator.serviceWorker?.controller),
    statusTimeoutId: null,
    sessionWatchId: null,
    updateCheckId: null
  };

  window.FitnessRpgPwa = pwa;

  pwa.getElements = function getElements() {
    return {
      prompt: document.querySelector("#pwaPrompt"),
      icon: document.querySelector("#pwaPromptIcon"),
      title: document.querySelector("#pwaPromptTitle"),
      message: document.querySelector("#pwaPromptMessage"),
      primary: document.querySelector("#pwaPromptPrimaryButton"),
      dismiss: document.querySelector("#pwaPromptDismissButton"),
      status: document.querySelector("#pwaConnectionStatus")
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
    if (pwa.isStandalone() || pwa.waitingWorker || pwa.newControllerReady) return;

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

    if (pwa.waitingWorker || pwa.newControllerReady) {
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
    if (
      (!pwa.waitingWorker && !pwa.newControllerReady)
      || pwa.updateDismissed
    ) {
      return;
    }

    const activeWorkout = pwa.hasActiveWorkout();

    pwa.showPrompt({
      mode: "update",
      icon: "✨",
      title: "Mise à jour prête",
      message: activeWorkout
        ? "Ta séance reste ouverte. La nouvelle version pourra être appliquée dès qu’elle sera terminée."
        : "Une nouvelle version de Fitness RPG est disponible. Tes sauvegardes seront conservées.",
      primaryLabel: activeWorkout
        ? "Après la séance"
        : (pwa.newControllerReady ? "Recharger" : "Mettre à jour"),
      primaryAction: "update",
      primaryDisabled: activeWorkout
    });
  };

  pwa.refreshPrompt = function refreshPrompt() {
    if (pwa.waitingWorker || pwa.newControllerReady) {
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

  pwa.checkForUpdate = function checkForUpdate() {
    if (!pwa.registration || !navigator.onLine) return;
    void pwa.registration.update().catch(() => undefined);
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
      pwa.checkForUpdate();
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
      pwa.checkForUpdate();
    });

    window.addEventListener("offline", () => {
      pwa.showConnectionStatus("Mode hors connexion.", "offline", true);
    });

    navigator.serviceWorker?.addEventListener("controllerchange", () => {
      if (!pwa.hadControllerAtStart) {
        pwa.hadControllerAtStart = true;
        return;
      }

      if (pwa.reloadPending || !pwa.hasActiveWorkout()) {
        window.location.reload();
        return;
      }

      pwa.waitingWorker = null;
      pwa.newControllerReady = true;
      pwa.updateDismissed = false;
      pwa.showUpdatePrompt();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        pwa.checkForUpdate();
        pwa.refreshPrompt();
      }
    });

    window.addEventListener("storage", () => {
      if (pwa.activePrompt === "update") {
        pwa.showUpdatePrompt();
      }
    });

    pwa.sessionWatchId = window.setInterval(() => {
      if (pwa.activePrompt === "update") {
        pwa.showUpdatePrompt();
      }
    }, 15000);

    pwa.updateCheckId = window.setInterval(() => {
      pwa.checkForUpdate();
    }, 60 * 60 * 1000);

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
