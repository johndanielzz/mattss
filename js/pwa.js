// PWA Registration & Install Prompt Handler
(function() {
  'use strict';

  let deferredPrompt = null;
  let installResolve = null;

  // Register service worker
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.log('[PWA] Service Worker registered:', reg.scope);
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showUpdateToast();
                }
              });
            }
          });
        })
        .catch((err) => console.error('[PWA] SW registration failed:', err));
    }
  }

  // Show update notification
  function showUpdateToast() {
    const toast = document.createElement('div');
    toast.className = 'pwa-toast';
    toast.innerHTML = `
      <span>New version available!</span>
      <button class="btn btn-primary btn-sm" onclick="location.reload()">Update</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('pwa-toast--visible'), 100);
  }

  // Create install button
  function createInstallButton() {
    const btn = document.createElement('button');
    btn.className = 'pwa-install-btn';
    btn.setAttribute('aria-label', 'Install app');
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span>Install App</span>
    `;
    btn.addEventListener('click', showInstallPrompt);
    return btn;
  }

  // Show install prompt
  function showInstallPrompt() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted install');
        hideInstallButton();
      } else {
        console.log('[PWA] User dismissed install');
      }
      deferredPrompt = null;
    });
  }

  // Hide install button
  function hideInstallButton() {
    const btn = document.querySelector('.pwa-install-btn');
    if (btn) btn.remove();
  }

  // Check if already installed
  function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  }

  // Inject install button into topbar
  function injectInstallButton() {
    if (isAppInstalled()) return;
    if (!deferredPrompt) return;

    const topbar = document.querySelector('.topbar-actions');
    if (!topbar) return;

    const existing = topbar.querySelector('.pwa-install-btn');
    if (existing) return;

    const btn = createInstallButton();
    topbar.insertBefore(btn, topbar.firstChild);
  }

  // Listen for beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    injectInstallButton();
  });

  // Listen for app installed
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App was installed');
    deferredPrompt = null;
    hideInstallButton();
  });

  // Listen for display mode changes
  window.matchMedia('(display-mode: standalone)').addEventListener('change', (event) => {
    if (event.matches) hideInstallButton();
  });

  // Register SW on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerSW);
  } else {
    registerSW();
  }

  // Re-inject button when DOM changes (for SPA-like navigation)
  const observer = new MutationObserver(() => {
    if (deferredPrompt && !isAppInstalled()) {
      injectInstallButton();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();