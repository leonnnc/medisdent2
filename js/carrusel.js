// CARRUSEL CON TRANSICIONES ALEATORIAS

class Carrusel {
    constructor() {
        this.items = document.querySelectorAll('.carrusel-item');
        this.prevBtn = document.getElementById('carrusel-prev');
        this.nextBtn = document.getElementById('carrusel-next');
        this.dotsContainer = document.getElementById('carrusel-dots');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.transiciones = ['fade-in', 'slide-left', 'slide-right', 'zoom-in'];
        
        this.init();
    }

    init() {
        this.crearDots();
        this.agregarEventos();
        this.autoPlay();
        this.cargarImagenesFirebase();
    }

    crearDots() {
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dot.addEventListener('click', () => this.irASlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    agregarEventos() {
        this.prevBtn.addEventListener('click', () => this.anterior());
        this.nextBtn.addEventListener('click', () => this.siguiente());
        
        // Parar autoplay al pasar mouse
        document.querySelector('.carrusel-hero').addEventListener('mouseenter', () => this.pausar());
        document.querySelector('.carrusel-hero').addEventListener('mouseleave', () => this.autoPlay());
    }

    autoPlay() {
        this.autoPlayInterval = setInterval(() => this.siguiente(), 5000);
    }

    pausar() {
        clearInterval(this.autoPlayInterval);
    }

    siguiente() {
        this.irASlide((this.currentIndex + 1) % 5);
    }

    anterior() {
        this.irASlide((this.currentIndex - 1 + 5) % 5);
    }

    irASlide(index) {
        const items = document.querySelectorAll('.carrusel-item');
        items.forEach((item, i) => {
            item.classList.remove('active', ...this.transiciones);
            if (i === index) {
                const transicion = this.transiciones[Math.floor(Math.random() * this.transiciones.length)];
                item.classList.add('active', transicion);
            }
        });

        // Actualizar dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentIndex = index;
        this.pausar();
        this.autoPlay();
    }

    cargarImagenesFirebase() {
        // Aquí se cargarán las imágenes desde Firebase cuando se implemente el admin
        // Por ahora usa placeholders
        const titulos = ['Bienvenido a Medisdent', 'Sonrisa Perfecta', 'Tecnología Dental', 'Equipo Profesional', 'Tu Salud Bucal'];
        const descripciones = ['Servicios dentales de calidad', 'Procedimientos avanzados', 'Equipo moderno', 'Profesionales capacitados', 'Cuidado y confianza'];
        
        const contenedorItems = document.getElementById('carrusel-items');
        contenedorItems.innerHTML = '';

        for (let i = 1; i <= 5; i++) {
            const item = document.createElement('div');
            item.classList.add('carrusel-item');
            if (i === 1) item.classList.add('active');
            
            item.innerHTML = `
                <div class="carrusel-img-wrapper">
                    <img src="https://via.placeholder.com/1920x600?text=Medisdent+${i}" alt="Imagen ${i}" class="carrusel-img">
                </div>
                <div class="carrusel-overlay"></div>
                <div class="carrusel-text">
                    <h2>${titulos[i-1]}</h2>
                    <p>${descripciones[i-1]}</p>
                </div>
            `;
            contenedorItems.appendChild(item);
        }

        this.items = document.querySelectorAll('.carrusel-item');
    }
}

// Inicializar carrusel cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    new Carrusel();
});
