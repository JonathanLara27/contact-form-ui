# 🎨 Contact Block UI (Frontend)

Interfaz de usuario para formulario de contacto, diseñada para simular un **bloque personalizado** (tipo Elementor). Desarrollado con tecnologías estándar web (Vanilla JS) sin dependencia de frameworks, enfocado en performance, accesibilidad y diseño responsive.

## 🚀 Stack Tecnológico

* **HTML5:** Estructura semántica.
* **CSS3:** Diseño Responsive, Flexbox y Variables CSS (Custom Properties).
* **JavaScript (ES6+):** Lógica del DOM, validaciones y Fetch API.

## ✨ Características

1.  **Validación en Cliente:** Lógica personalizada en JS para validar emails, campos vacíos y longitud de mensajes antes de enviar al servidor.
2.  **Micro-interacciones:**
    * Tooltip de seguridad que aparece al hacer foco en el mensaje.
    * Spinner de carga nativo con CSS.
    * Feedback visual (bordes rojos/verdes) en tiempo real.
3.  **Responsive Design:** Adaptable a dispositivos móviles y escritorio (Mobile First approach).
4.  **Integración API:** Conexión asíncrona (`async/await`) con el backend NestJS.

## 📦 Instalación y Uso

Este es un proyecto estático, por lo que no requiere compilación.

1.  **Clonar el repositorio.**
2.  **Abrir el proyecto:**
    Puedes abrir el archivo `index.html` directamente en tu navegador.
    
    *Recomendación:* Usar **Live Server** (VS Code Extension) para simular un servidor local y evitar problemas de CORS con algunos navegadores estrictos.

3.  **Configuración de API:**
    Si el backend no corre en el puerto `3001`, edita la constante en `app.js`:
    ```javascript
    const API_URL = 'http://localhost:3001/api/contactos';
    ```

## 📂 Estructura del Proyecto

```text
contact-block-ui/
├── index.html    # Estructura del formulario
├── style.css     # Estilos, variables y animaciones
├── app.js        # Lógica de validación y conexión HTTP
└── README.md     # Documentación