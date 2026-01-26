const latPonto = -5.7372347;
const lngPonto = -35.2360433;

const map = L.map('meuMapa').setView([latPonto, lngPonto], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);