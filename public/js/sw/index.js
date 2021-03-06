
var staticCacheName = 'wittr-static-v6';

self.addEventListener('install', function(event) {

  event.waitUntil(
    // TODO: change the site's theme, eg swap the vars in public/scss/_theme.scss
    // Ensure at least $primary-color changes
    // TODO: change cache name to 'wittr-static-v2'

    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames){
	return Promise.all(
	cacheNames.filter(function(cacheName){
	return cacheName.startsWith('wittr-') && cacheName != staticCacheName;
	}).map(function(cacheName){
	return caches.delete(cacheName);
	})
	)
    })
  );
});

self.addEventListener('fetch', function(event) {
  // TODO: respond with an entry from the cache if there is one.
  // If there isn't, fetch from the network.

  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin){
  	if (requestUrl.pathname === '/') {
  		event.respondWith(caches.match('/skeleton'));
  		return;
  	}
  }

  event.respondWith(
	caches.match(event.request).then(function(response){
	if (response) return response;
	return fetch(event.request);
	})
  );
});

// TODO: listen for the "message" event, and call
// skipWaiting if you get the appropriate message
self.addEventListener('message', function(event){
	if (event.data.action == 'skipWaiting') {
		self.skipWaiting();
	}
});