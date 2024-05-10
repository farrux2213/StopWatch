// Web Worker yaratish
const worker = new Worker("worker.js");

// Web Worker orqali setInterval yaratish
worker.postMessage({ interval: 0.001 });

// worker.js fayli
self.onmessage = function (e) {
  setInterval(() => {}, e.data.interval);
};
