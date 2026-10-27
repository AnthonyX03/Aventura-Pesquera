const CACHE='aventura-pesquera-v63';
const ASSETS=['./','./index.html','./styles.css','./game.js','./manifest.webmanifest','./assets/icon.svg','./assets/gacha-fish.jpg','./assets/gacha-event.jpg','./assets/gacha-treasure.jpg','./audio/AventuraPesquera.mp3'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS).catch(err=>console.warn('Cache partial',err))));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 event.respondWith(
  caches.match(event.request).then(cached=>{
   const net=fetch(event.request).then(response=>{
    if(response&&response.ok&&new URL(event.request.url).origin===self.location.origin){
     const copy=response.clone();
     caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    }
    return response;
   }).catch(()=>cached||caches.match('./index.html'));
   return cached||net;
  })
 );
});
