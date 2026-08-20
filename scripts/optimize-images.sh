#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
image_root="${1:-$project_root/assets}"
webp_quality="${FITNESS_WEBP_QUALITY:-88}"
worker_count="${FITNESS_WEBP_JOBS:-4}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Erreur : ffmpeg avec l'encodeur libwebp est requis." >&2
  exit 1
fi

if ! ffmpeg -hide_banner -encoders 2>/dev/null | grep -q 'libwebp'; then
  echo "Erreur : l'encodeur libwebp n'est pas disponible dans ffmpeg." >&2
  exit 1
fi

if [[ ! -d "$image_root" ]]; then
  echo "Erreur : dossier d'images introuvable : $image_root" >&2
  exit 1
fi

find "$image_root" -type f -iname '*.png' -print0 \
  | xargs -0 -r -P "$worker_count" -I{} bash -c '
      source_file="$1"
      quality="$2"
      output_file="${source_file%.*}.webp"

      case "$source_file" in
        */assets/exercices/*|*/assets/badges/*|*/assets/familiers/*|*/assets/categories/*|*/assets/boss/*)
          ffmpeg -hide_banner -loglevel error -y \
            -i "$source_file" \
            -vf "scale=min(1024\\,iw):min(1024\\,ih):force_original_aspect_ratio=decrease" \
            -frames:v 1 -c:v libwebp -preset picture -quality "$quality" \
            "$output_file"
          ;;
        *)
          ffmpeg -hide_banner -loglevel error -y \
            -i "$source_file" \
            -frames:v 1 -c:v libwebp -preset picture -quality "$quality" \
            "$output_file"
          ;;
      esac
    ' _ {} "$webp_quality"

png_count="$(find "$image_root" -type f -iname '*.png' | wc -l)"
webp_count="$(find "$image_root" -type f -iname '*.webp' | wc -l)"

printf 'Conversion terminée : %s PNG sources, %s WebP disponibles.\n' "$png_count" "$webp_count"
printf 'Aucun PNG source n\047a été supprimé.\n'
