// CARGAR STAFF DESDE FIREBASE

class Staff {
    constructor() {
        this.container = document.getElementById('staff-container');
        this.cargarStaffFirebase();
    }

    async cargarStaffFirebase() {
        try {
            // Datos de ejemplo (reemplazar con Firebase Firestore después)
            const staffData = [
                {
                    id: 1,
                    nombre: 'Dr. Juan García',
                    especialidad: 'Odontología General',
                    foto: 'https://via.placeholder.com/300x300?text=Dr.+Juan',
                    email: 'juan@medisdent.com',
                    telefono: '+1 (555) 111-1111',
                    descripcion: 'Especialista en tratamientos generales con 15 años de experiencia',
                    horarios: {
                        lunes: '9:00 - 17:00',
                        martes: '9:00 - 17:00',
                        miercoles: '9:00 - 17:00',
                        jueves: '10:00 - 18:00',
                        viernes: '9:00 - 16:00'
                    }
                },
                {
                    id: 2,
                    nombre: 'Dra. María López',
                    especialidad: 'Ortodoncia',
                    foto: 'https://via.placeholder.com/300x300?text=Dra.+Maria',
                    email: 'maria@medisdent.com',
                    telefono: '+1 (555) 222-2222',
                    descripcion: 'Experta en ortodoncia y alineación dental',
                    horarios: {
                        martes: '10:00 - 18:00',
                        miercoles: '9:00 - 17:00',
                        jueves: '9:00 - 17:00',
                        viernes: '10:00 - 18:00'
                    }
                },
                {
                    id: 3,
                    nombre: 'Dr. Carlos Rodríguez',
                    especialidad: 'Implantología',
                    foto: 'https://via.placeholder.com/300x300?text=Dr.+Carlos',
                    email: 'carlos@medisdent.com',
                    telefono: '+1 (555) 333-3333',
                    descripcion: 'Especialista en implantes y cirugía oral',
                    horarios: {
                        lunes: '10:00 - 18:00',
                        miercoles: '10:00 - 18:00',
                        viernes: '10:00 - 18:00',
                        sabado: '9:00 - 13:00'
                    }
                }
            ];

            this.renderStaff(staffData);
        } catch (error) {
            console.error('Error cargando staff:', error);
        }
    }

    renderStaff(staff) {
        this.container.innerHTML = '';
        
        staff.forEach(dentista => {
            const card = document.createElement('div');
            card.classList.add('staff-card');
            
            let horariosHTML = '';
            for (const [dia, horario] of Object.entries(dentista.horarios)) {
                const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1);
                horariosHTML += `<div class="horario-item"><span class="horario-dia">${diaCapitalizado}:</span> <span class="horario-horas">${horario}</span></div>`;
            }

            card.innerHTML = `
                <img src="${dentista.foto}" alt="${dentista.nombre}" class="staff-card-img">
                <div class="staff-card-content">
                    <h3>${dentista.nombre}</h3>
                    <p class="staff-especialidad">${dentista.especialidad}</p>
                    <p class="staff-descripcion">${dentista.descripcion}</p>
                    <div class="staff-horarios">
                        ${horariosHTML}
                    </div>
                    <div class="staff-contacto">
                        <a href="tel:${dentista.telefono}" title="Llamar">📞</a>
                        <a href="mailto:${dentista.email}" title="Enviar email">✉️</a>
                    </div>
                </div>
            `;
            
            this.container.appendChild(card);
        });
    }
}

// Inicializar cuando DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    new Staff();
});
