let currentStep = 'email';
const steps = ['emailStep', 'codeStep', 'passwordStep'];

function showStep(step) {
    steps.forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(step).classList.remove('hidden');
    currentStep = step;
}

function showMessage(type, content) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = content;
    messageElement.className = `message ${type}`;
}

function sendVerificationCode() {
    const email = document.getElementById('email').value;
    if (!email) {
        showMessage('error', 'Por favor, ingrese un correo electrónico.');
        return;
    }
    // Simulación de envío de código
    showMessage('info', 'Código de verificación enviado al correo.');
    showStep('codeStep');
    setupCodeInputs();
}

function setupCodeInputs() {
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });
}

function verifyCode() {
    const codeInputs = document.querySelectorAll('.code-input');
    const code = Array.from(codeInputs).map(input => input.value).join('');
    if (code.length !== 4) {
        showMessage('error', 'Por favor, ingrese el código completo de 4 dígitos.');
        return;
    }
    // Simulación de verificación de código
    if (code === '1234') { // Código de ejemplo
        showMessage('success', 'Código verificado correctamente.');
        showStep('passwordStep');
    } else {
        showMessage('error', 'Código incorrecto. Intente nuevamente.');
    }
}

function verifyPassword() {
    const password = document.getElementById('password').value;
    if (!password) {
        showMessage('error', 'Por favor, ingrese su contraseña.');
        return;
    }
    // Simulación de verificación de contraseña
    if (password === 'password123') { // Contraseña de ejemplo
        showMessage('success', 'Contraseña correcta. Acceso concedido.');
    } else {
        showMessage('error', 'Contraseña incorrecta. Intente nuevamente.');
    }
}

// Inicializar mostrando el paso de correo electrónico
showStep('emailStep');