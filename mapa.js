document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([51.2465, 22.5684], 12); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var rowerowa23a = [51.24228172022361, 22.55226876868691]; 
    L.marker(rowerowa23a).addTo(map)
        .bindPopup('Rowerowa 23a, Lublin')
        .openPopup();
});
