if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/weather-web-page/../sw.js', {scope: '/weather-web-page/'})
    .then(reg => console.log('service worker registered', reg))
    .catch(err => console.log('service worker not registered', err));
}