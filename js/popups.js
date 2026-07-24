// POPUPS ALEATORIOS DE PROMOCIONES

class PopupPromociones {
    constructor() {
        this.popup = document.getElementById('popup-promocion');
        this.modal = document.getElementById('modal-oferta');
        this.promocionesList = [
            { titulo: '🎉 Descuento 20%', descripcion: 'En Blanqueamiento Dental', descuento: '¡20% OFF!' },
            { titulo: '✨ Promoción Especial', descripcion: 'Limpieza + Consulta $30', descuento: 'SOLO $30' },
            { titulo: '🎁 Regalo Sorpresa', descripcion: '¡Agenda hoy y lleva un regalo!', descuento: 'GRATIS' },
            { titulo: '💎 Ortodoncia', descripcion: 'Primera consulta sin costo', descuento: 'GRATIS' },
            { titulo: '⭐ Implantes', descripcion: '15% descuento en implantes', descuento: '15% OFF' }
        ];

        this.init();
    }

    init() {
        // Mostrar modal de oferta al cargar (una vez por sesión)
        if (!sessionStorage.getItem('ofertaMostrada')) {
            setTimeout(() => this.mostrarOfertaDelDia(), 500);
            sessionStorage.setItem('ofertaMostrada', 'true');
        }

        // Popups aleatorios cada 2-5 minutos
        this.iniciarPopupsAleatorios();

        // Event listeners para cerrar
        document.querySelector('.modal-close').addEventListener('click', () => this.cerrarModal());
        document.querySelector('.popup-close').addEventListener('click', () => this.cerrarPopup());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.cerrarModal();
        });
    }

    mostrarOfertaDelDia() {
        const oferta = this.promocionesList[Math.floor(Math.random() * this.promocionesList.length)];
        
        const contenido = document.getElementById('oferta-contenido');
        contenido.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2 style="color: var(--secondary); font-size: 2rem; margin-bottom: 10px;">${oferta.titulo}</h2>
                <p style="color: var(--gray); font-size: 1.1rem; margin-bottom: 20px;">${oferta.descripcion}</p>
                <div style="background: linear-gradient(135deg, var(--secondary), var(--accent)); color: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
                    <p style="font-size: 1.5rem; font-weight: 700; margin: 0;">${oferta.descuento}</p>
                </div>
                <button class="btn-primary" onclick="document.getElementById('modal-oferta').classList.remove('show');">Agendar Ahora</button>
            </div>
        `;
        
        this.modal.classList.add('show');
    }

    iniciarPopupsAleatorios() {
        setInterval(() => {
            const tiempoAleatorio = 120000 + Math.random() * 180000; // 2-5 minutos
            setTimeout(() => this.mostrarPopupAleatorio(), tiempoAleatorio);
        }, 300000); // Verificar cada 5 minutos
    }

    mostrarPopupAleatorio() {
        if (this.popup.classList.contains('show')) return; // No mostrar si ya está abierto

        const promo = this.promocionesList[Math.floor(Math.random() * this.promocionesList.length)];
        
        const contenido = document.getElementById('popup-contenido');
        contenido.innerHTML = `
            <div class="popup-titulo">${promo.titulo}</div>
            <div class="popup-descripcion">${promo.descripcion}</div>
            <div class="popup-descuento">${promo.descuento}</div>
            <button class="btn-primary" style="width: 100%; margin-top: 15px; padding: 10px;">Más Información</button>
        `;
        
        this.popup.classList.add('show');
        
        // Auto-cerrar después de 10 segundos
        setTimeout(() => this.cerrarPopup(), 10000);
    }

    cerrarPopup() {
        this.popup.classList.remove('show');
    }

    cerrarModal() {
        this.modal.classList.remove('show');
    }
}

// Inicializar popups
document.addEventListener('DOMContentLoaded', () => {
    new PopupPromociones();
});
