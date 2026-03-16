import { useEffect, useState } from 'react';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      // Prevent default browser mini-infobar and show custom UI.
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!deferredPrompt) return null;

  return (
    <div className="install-banner" role="status" aria-live="polite">
      <span>Install Worship Song Library for quick access and offline support.</span>
      <button
        onClick={async () => {
          deferredPrompt.prompt();
          await deferredPrompt.userChoice;
          setDeferredPrompt(null);
        }}
      >
        Install App
      </button>
    </div>
  );
}

export default InstallPrompt;
