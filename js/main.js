// main.js - Archivo JavaScript principal para Mundo Cancel

// Función para ocultar la pantalla de carga
function hideSplashScreen() {
    setTimeout(function() {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
    }, 3000);
}

// Función para inicializar el mapa
function initMap() {
    if (typeof L !== 'undefined') {
        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            maxZoom: 19,
        }).addTo(map);
    }
}

// Función para manejar el envío del formulario de contacto
function handleContactForm(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', { nombre, email, mensaje });
    alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
    
    // Limpiar el formulario
    event.target.reset();
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    hideSplashScreen();
    initMap();
    
    // Agregar event listener al formulario de contacto
    const contactForm = document.querySelector('#contacto form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});
