// main.js - Archivo JavaScript principal para Mundo Cancel - Hyper-Glow Edition

// Background Particle Generator (Larger and more frequent for Hyper-Glow)
function initParticles() {
    const bgContainer = document.getElementById('bgContainer');
    if (!bgContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 4; // Larger
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 4 + 2; 
        const delay = Math.random() * 1.5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.top = '110vh';
        particle.style.animation = `float-particle ${duration}s linear ${delay}s infinite`;
        
        bgContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // More frequent particles
    for(let i = 0; i < 40; i++) {
        createParticle();
    }
    setInterval(createParticle, 250);
}

// Función para ocultar la pantalla de carga
function hideSplashScreen() {
    setTimeout(function() {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
            splashScreen.style.opacity = '0';
            splashScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 500);
        }
    }, 3000);
}

// Función para inicializar el mapa con estilo oscuro
function initMap() {
    if (typeof L !== 'undefined') {
        var map = L.map('map').setView([40.4168, -3.7038], 13); // Madrid por defecto
        
        // Capa de mapa oscura para coincidir con el tema Hyper-Glow
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { 
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
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
    initParticles();
    hideSplashScreen();
    initMap();
    
    // Agregar event listener al formulario de contacto
    const contactForm = document.querySelector('#contacto form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});
