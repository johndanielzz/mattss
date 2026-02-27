(function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost") return;

  window.addEventListener("load", function onLoad() {
    navigator.serviceWorker.register("./service-worker.js").catch(function () {
      // Ignore registration failures to avoid impacting page behavior.
    });
  });
})();
