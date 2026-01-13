document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración y Selectores
    const API_URL = 'http://localhost:3001/api/contactos';
    
    const form = document.getElementById('contactForm');
    const inputs = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        mensaje: document.getElementById('mensaje')
    };
    const errors = {
        nombre: document.getElementById('error-nombre'),
        email: document.getElementById('error-email'),
        mensaje: document.getElementById('error-mensaje')
    };
    const tooltip = document.getElementById('securityTooltip');
    const btnSubmit = document.getElementById('btnSubmit');
    const spinner = btnSubmit.querySelector('.spinner');
    const btnText = btnSubmit.querySelector('span');
    const feedbackBox = document.getElementById('formFeedback');

    // 2. Lógica del Tooltip (Requisito: Ayuda flotante al escribir)
    inputs.mensaje.addEventListener('focus', () => {
        tooltip.classList.remove('hidden');
    });

    inputs.mensaje.addEventListener('blur', () => {
        tooltip.classList.add('hidden');
    });

    // 3. Funciones de Utilidad
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const toggleLoading = (isLoading) => {
        if (isLoading) {
            btnSubmit.disabled = true;
            spinner.classList.remove('hidden');
            btnText.textContent = 'Enviando...';
        } else {
            btnSubmit.disabled = false;
            spinner.classList.add('hidden');
            btnText.textContent = 'Enviar Mensaje';
        }
    };

    const showMessage = (type, text) => {
        feedbackBox.textContent = text;
        feedbackBox.className = `feedback-box ${type}`; // success o error
        feedbackBox.classList.remove('hidden');
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            feedbackBox.classList.add('hidden');
        }, 5000);
    };

    const validateForm = () => {
        let isValid = true;
        
        // Limpiar errores previos
        Object.values(errors).forEach(el => el.textContent = '');
        Object.values(inputs).forEach(el => el.classList.remove('invalid'));

        // Validar Nombre
        if (!inputs.nombre.value.trim()) {
            errors.nombre.textContent = 'El nombre es obligatorio.';
            inputs.nombre.classList.add('invalid');
            isValid = false;
        }

        // Validar Email
        if (!isValidEmail(inputs.email.value.trim())) {
            errors.email.textContent = 'Ingresa un correo electrónico válido.';
            inputs.email.classList.add('invalid');
            isValid = false;
        }

        // Validar Mensaje
        const msgValue = inputs.mensaje.value.trim();
        if (msgValue.length < 10) {
            errors.mensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
            inputs.mensaje.classList.add('invalid');
            isValid = false;
        }

        return isValid;
    };

    // 4. Manejo del Envío (Submit)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        toggleLoading(true);
        feedbackBox.classList.add('hidden');

        // Preparar datos
        const payload = {
            nombre: inputs.nombre.value.trim(),
            email: inputs.email.value.trim(),
            mensaje: inputs.mensaje.value.trim()
        };

        try {
            // Llamada al Backend NestJS
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                // Manejar errores del backend (Bad Request, etc.)
                throw new Error(data.message || 'Error al enviar el formulario');
            }

            // Éxito
            showMessage('success', '¡Gracias por contactarnos! Hemos recibido tu mensaje.');
            form.reset();

        } catch (error) {
            console.error(error);
            // Si el error es un array (validación de NestJS), mostrar el primero
            const errorMsg = Array.isArray(error.message) 
                ? error.message[0] 
                : (error.message || 'Error de conexión con el servidor.');
            
            showMessage('error', `Error: ${errorMsg}`);
        } finally {
            toggleLoading(false);
        }
    });
});