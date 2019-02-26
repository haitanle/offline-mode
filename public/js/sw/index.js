self.addEventListener('fetch', function(event) {
  event.respondWith(
	new Response('<h2 class="a-winner-is-me">hello there</h2>', {
		headers: {'Content-Type': 'text/html'}
	})
  );
});