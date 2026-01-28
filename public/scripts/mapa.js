const latPonto = -5.7372347;
const lngPonto = -35.2360433;

const map = L.map('meuMapa').setView([latPonto, lngPonto], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Detectar localização do usuário e adicionar raio de 5km
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Adicionar marcador de localização do usuário
            L.circleMarker([userLat, userLng], {
                radius: 8,
                fillColor: '#FF0000',
                color: '#000',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map).bindPopup('Sua localização');

            // Adicionar raio de 5km (5000 metros)
            L.circle([userLat, userLng], {
                radius: 5000,
                color: '#FF0000',
                weight: 2,
                opacity: 0.5,
                fillColor: '#FF0000',
                fillOpacity: 0.1
            }).addTo(map);

            // Centralizar o mapa na localização do usuário
            map.setView([userLat, userLng], 14);
        },
        function(error) {
            console.log('Erro ao obter localização: ' + error.message);
        }
    );
} else {
    console.log('Geolocalização não suportada pelo navegador');
}