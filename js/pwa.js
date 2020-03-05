if('serviceWorker' in navigator){
    navigator.serviceWorker.register('https://r3d-roman.github.io/weather-web-page/../sw.js')
      .then(reg => console.log('service worker registered', reg))
      .catch(err => console.log('service worker not registered', err));
  }