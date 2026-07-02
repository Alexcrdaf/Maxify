self.addEventListener('install', e => {
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('push', e => {
    let data = { title: 'Maxify', body: 'Новое сообщение!' };
    try {
        if (e.data) {
            data = e.data.json();
        }
    } catch (err) {}
    
    e.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'icon.png',
            badge: 'icon.png'
        })
    );
});

self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow('/');
            }
        })
    );
});
