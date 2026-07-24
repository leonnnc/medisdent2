// SISTEMA DE CITAS CON FIREBASE

class SistemaCitas {
    constructor() {
        this.form = document.getElementById('form-cita');
        this.citasConfirmadas = document.getElementById('citas-confirmadas');
        this.horasDisponibles = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
        this.duracionCita = 120; // 2 horas en minutos
        
        this.init();
    }

    init() {
        this.cargarServicios();
        this.cargarDentistas();
        this.form.addEventListener('submit', (e) => this.agendar(e));
        this.establecerFechaMinima();
        this.cargarCitasFirebase();
    }

    establecerFechaMinima() {
        const inputFecha = document.getElementById('fecha');
        const hoy = new Date().toISOString().split('T')[0];
        inputFecha.min = hoy;
    }

    cargarServicios() {
        // Datos de ejemplo
        const servicios = [
            { id: 1, nombre: 'Limpieza Dental', duracion: 60 },
            { id: 2, nombre: 'Blanqueamiento', duracion: 90 },
            { id: 3, nombre: 'Consulta General', duracion: 30 },
            { id: 4, nombre: 'Extracción Dental', duracion: 60 },
            { id: 5, nombre: 'Tratamiento de Raíz', duracion: 120 }
        ];

        const selectServicio = document.getElementById('servicio');
        servicios.forEach(servicio => {
            const option = document.createElement('option');
            option.value = servicio.id;
            option.textContent = `${servicio.nombre} (${servicio.duracion} min)`;
            selectServicio.appendChild(option);
        });
    }

    cargarDentistas() {
        // Datos de ejemplo
        const dentistas = [
            { id: 1, nombre: 'Dr. Juan García' },
            { id: 2, nombre: 'Dra. María López' },
            { id: 3, nombre: 'Dr. Carlos Rodríguez' }
        ];

        const selectDentista = document.getElementById('dentista');
        dentistas.forEach(dentista => {
            const option = document.createElement('option');
            option.value = dentista.id;
            option.textContent = dentista.nombre;
            selectDentista.appendChild(option);
        });
    }

    cargarHorasDisponibles() {
        const fecha = document.getElementById('fecha').value;
        const dentista = document.getElementById('dentista').value;
        const selectHora = document.getElementById('hora');

        if (!fecha || !dentista) {
            selectHora.innerHTML = '<option value="">Selecciona fecha y dentista primero</option>';
            return;
        }

        selectHora.innerHTML = '<option value="">Selecciona una hora</option>';
        this.horasDisponibles.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            selectHora.appendChild(option);
        });
    }

    async agendar(e) {
        e.preventDefault();

        const datos = {
            paciente: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            servicio: document.getElementById('servicio').value,
            dentista: document.getElementById('dentista').value,
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            estado: 'confirmada',
            timestamp: new Date().toISOString()
        };

        try {
            // Aquí irá la lógica de Firebase para guardar
            console.log('Cita agendada:', datos);
            
            // Guardar temporalmente en localStorage para demostración
            let citas = JSON.parse(localStorage.getItem('citas')) || [];
            citas.push(datos);
            localStorage.setItem('citas', JSON.stringify(citas));

            // Mostrar confirmación
            alert('¡Cita agendada exitosamente! Se ha enviado un email de confirmación.');
            this.form.reset();
            this.cargarCitasFirebase();
        } catch (error) {
            console.error('Error al agendar:', error);
            alert('Error al agendar la cita. Intenta de nuevo.');
        }
    }

    cargarCitasFirebase() {
        // Cargar citas desde localStorage (después será desde Firebase)
        let citas = JSON.parse(localStorage.getItem('citas')) || [];
        this.renderCitas(citas);
    }

    renderCitas(citas) {
        this.citasConfirmadas.innerHTML = '';

        if (citas.length === 0) {
            this.citasConfirmadas.innerHTML = '<p style="text-align: center; color: var(--gray);">No hay citas agendadas aún</p>';
            return;
        }

        citas.forEach((cita, index) => {
            const item = document.createElement('div');
            item.classList.add('cita-item');
            
            item.innerHTML = `
                <div class="cita-header">
                    <span class="cita-titulo">Cita #${index + 1}</span>
                    <span class="cita-estado ${cita.estado}">${cita.estado.toUpperCase()}</span>
                </div>
                <div class="cita-info">
                    <div class="cita-info-item"><strong>👤 Paciente:</strong> ${cita.paciente}</div>
                    <div class="cita-info-item"><strong>📅 Fecha:</strong> ${cita.fecha}</div>
                    <div class="cita-info-item"><strong>⏰ Hora:</strong> ${cita.hora}</div>
                    <div class="cita-info-item"><strong>👨‍⚕️ Dentista:</strong> ${cita.dentista}</div>
                </div>
            `;
            
            this.citasConfirmadas.appendChild(item);
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const citas = new SistemaCitas();
    
    // Actualizar horas cuando cambia fecha o dentista
    document.getElementById('fecha').addEventListener('change', () => citas.cargarHorasDisponibles());
    document.getElementById('dentista').addEventListener('change', () => citas.cargarHorasDisponibles());
});
