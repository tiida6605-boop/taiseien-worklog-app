const CACHE_NAME = "taiseien-pwa-v4";
const SW_URL = new URL(self.location.href);
const BASE_PATH = SW_URL.pathname.slice(0, SW_URL.pathname.lastIndexOf("/") + 1);
const APP_BASE_URL = `${SW_URL.origin}${BASE_PATH}`;

function appUrl(relativePath = "") {
  return new URL(relativePath, APP_BASE_URL).toString();
}

const APP_SHELL = [
  appUrl(""),
  appUrl("index.html"),
  appUrl("style.css"),
  appUrl("app.js"),
  appUrl("manifest.json"),
  appUrl("offline.html"),
  appUrl("icons/icon-192.png"),
  appUrl("icons/icon-512.png")
];

const NETWORK_FIRST_PATHS = new Set(
  [
    appUrl(""),
    appUrl("index.html"),
    appUrl("style.css"),
    appUrl("app.js"),
    appUrl("manifest.json")
  ].map((url) => new URL(url).pathname)
);

function shouldUseNetworkFirstForAsset(request) {
  const requestUrl = new URL(request.url);
  return NETWORK_FIRST_PATHS.has(requestUrl.pathname);
}

async function putInCache(request, response) {
  if (!response || !response.ok) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

async function networkFirstForNavigation(request) {
  try {
    const networkResponse = await fetch(request);
    await putInCache(request, networkResponse);
    return networkResponse;
  } catch (error) {
    return (
      (await caches.match(request, { ignoreSearch: true })) ||
      (await caches.match(appUrl("index.html"), { ignoreSearch: true })) ||
      (await caches.match(appUrl("offline.html"), { ignoreSearch: true })) ||
      Response.error()
    );
  }
}

async function networkFirstForAsset(request) {
  try {
    const networkResponse = await fetch(request);
    await putInCache(request, networkResponse);
    return networkResponse;
  } catch (error) {
    return (
      (await caches.match(request, { ignoreSearch: true })) ||
      Response.error()
    );
  }
}

async function cacheFirstForStaticAssets(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    await putInCache(request, response);
    return response;
  } catch (error) {
    if (request.destination === "document") {
      return (
        (await caches.match(appUrl("index.html"), { ignoreSearch: true })) ||
        (await caches.match(appUrl("offline.html"), { ignoreSearch: true })) ||
        Response.error()
      );
    }
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstForNavigation(request));
    return;
  }

  if (shouldUseNetworkFirstForAsset(request)) {
    event.respondWith(networkFirstForAsset(request));
    return;
  }

  event.respondWith(cacheFirstForStaticAssets(request));
});
