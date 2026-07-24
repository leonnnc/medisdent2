// AUTENTICACIÓN FIREBASE PARA ADMIN

class Auth {
    constructor() {
        // Verificar si estamos en la página de admin
        if (window.location.pathname.includes('/admin')) {
            this.verificarAcceso();
        }
    }

    verificarAcceso() {
        const usuarioLogueado = localStorage.getItem('adminLogueado');
        
        if (!usuarioLogueado && !window.location.pathname.includes('login')) {
            // Redirigir a login si no está autenticado
            window.location.href = '/admin/login.html';
        }
    }

    static login(email, password) {
        // Validación simple (en producción usar Firebase Auth)
        if (email === 'admin@medisdent.com' && password === 'admin123') {
            localStorage.setItem('adminLogueado', 'true');
            localStorage.setItem('adminEmail', email);
            window.location.href = '/admin/index.html';
            return true;
        }
        return false;
    }

    static logout() {
        localStorage.removeItem('adminLogueado');
        localStorage.removeItem('adminEmail');
        window.location.href = '/';
    }
}

// Inicializar autenticación
document.addEventListener('DOMContentLoaded', () => {
    new Auth();
});
