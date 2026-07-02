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
