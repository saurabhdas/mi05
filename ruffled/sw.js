// Service worker: rewrite the schedule SWF's POST to day{1..4}.php as GET
// (the static origin can serve only GET; the SWF was authored for an
// Apache server that accepted POST and returned the file regardless).
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method === 'POST' && /\/day\d\.php(\?.*)?$/.test(new URL(req.url).pathname)) {
    e.respondWith(fetch(req.url, { method: 'GET', cache: 'no-store' }));
  }
});
