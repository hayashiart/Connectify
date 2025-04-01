// public/speed.js
function setPlaybackRate() {
    const audioElements = document.querySelectorAll('audio');
    if (audioElements.length > 0) {
      audioElements.forEach(audio => {
        if (audio.playbackRate !== 3) { // Évite de réappliquer inutilement
          audio.playbackRate = 3;
          console.log("Vitesse ajustée pour un élément audio");
        }
      });
    }
  }
  
  // Exécute au chargement initial
  document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.startsWith('/profile/music')) {
      setPlaybackRate();
      // Observe les changements dans le DOM pour les nouveaux éléments audio
      const observer = new MutationObserver(setPlaybackRate);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });