self.addEventListener('push', function(event){
  var d = {};
  try{ d = event.data ? event.data.json() : {}; }catch(e){}
  var title = d.title || '💬 Team Chat';
  var opts = { body: d.body || 'New message', data: { url: d.url || 'https://jeremylevinatwork-dev.github.io/loews-app/' } };
  event.waitUntil(self.registration.showNotification(title, opts));
});
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || 'https://jeremylevinatwork-dev.github.io/loews-app/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list){
    for(var i = 0; i < list.length; i++){ if(list[i].url.indexOf('loews-app') >= 0 && 'focus' in list[i]) return list[i].focus(); }
    if(clients.openWindow) return clients.openWindow(url);
  }));
});
