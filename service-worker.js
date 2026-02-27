const CACHE_VERSION = "v20260227a";
const STATIC_CACHE = `matrixmarket-static-${CACHE_VERSION}`;
const PAGE_CACHE = `matrixmarket-pages-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./shop.html",
  "./style.css",
  "./upgrade.css",
  "./index-home.css?v=20260227b",
  "./site-performance.js",
  "./site-performance.js?v=20260226a",
  "./sw-register.js",
  "./sw-register.js?v=20260226a",
  "./matrixx.png",
];

const STATIC_DESTINATIONS = new Set(["style", "script", "image", "font", "worker"]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      await cache.addAll(PRECACHE_URLS);
      await self.skipWaiting();
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name !== STATIC_CACHE && name !== PAGE_CACHE)
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!/^https?:$/.test(url.protocol)) return;

  const isDocument = request.mode === "navigate" || request.destination === "document";
  const isStatic = STATIC_DESTINATIONS.has(request.destination);

  if (isDocument) {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  if (isStatic) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;

    const fallback = await caches.match("./index.html");
    if (fallback) return fallback;

    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    return cached;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;

  return new Response("Offline", {
    status: 503,
    statusText: "Service Unavailable",
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
