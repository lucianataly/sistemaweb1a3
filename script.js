// Firebase Configuración
const firebaseConfig = {
  apiKey: "AIzaSyBPKf2V_kt7Fn-07An7RrDPa3yUaUZkjbs",  
  authDomain: "horario-de-asistencia-de-aip.firebaseapp.com", 
  projectId: "horario-de-asistencia-de-aip",  
  appId: "1:64345989878:web:b8da678bda9c91c40e12e9", 
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Manejo del login con usuario/contraseña
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('usuario').value;
  const pass = document.getElementById('contrasena').value;
  const guardar = document.getElementById('guardar').checked;

  // Guardar o eliminar los datos en localStorage
  if (guardar) {
    localStorage.setItem('usuario', user);
    localStorage.setItem('contrasena', pass);
  } else {
    localStorage.removeItem('usuario');
    localStorage.removeItem('contrasena');
  }

  // Intentar iniciar sesión con Firebase Authentication
  auth.signInWithEmailAndPassword(user, pass)
    .then((userCredential) => {
      alert(`¡Bienvenido ${userCredential.user.displayName || user}!`);
      // Redirigir a la página de Programación Semanal después de login exitoso
      window.location.href = 'Horario.html';  // Redirigir a la página proporcionada
    })
    .catch((error) => {
      console.error("Error al iniciar sesión", error);
      alert("Error al iniciar sesión: " + error.message);
    });
});

// Cargar datos guardados en el login (si los hay)
window.onload = function() {
  const savedUser = localStorage.getItem('usuario');
  const savedPass = localStorage.getItem('contrasena');
  if (savedUser && savedPass) {
    document.getElementById('usuario').value = savedUser;
    document.getElementById('contrasena').value = savedPass;
    document.getElementById('guardar').checked = true;
  }
};

// Recuperar contraseña
document.getElementById('recuperarContrasena').addEventListener('click', function () {
  const email = document.getElementById('usuario').value;

  if (!email) {
    alert("Por favor, ingresa tu correo electrónico.");
    return;
  }

  // Enviar correo para recuperación de contraseña
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Se ha enviado un correo con instrucciones para recuperar tu contraseña.");
    })
    .catch((error) => {
      console.error("Error al enviar correo de recuperación", error);
      alert("Error al enviar correo de recuperación: " + error.message);
    });
});

// Mostrar formulario de crear cuenta
document.getElementById('crearCuenta').addEventListener('click', function (e) {
  e.preventDefault();

  // Ocultar el formulario de login y mostrar el de crear cuenta
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('crearCuentaForm').style.display = 'block';
});

// Volver al login desde el formulario de crear cuenta
document.getElementById('volverLogin').addEventListener('click', function (e) {
  e.preventDefault();

  // Ocultar el formulario de crear cuenta y mostrar el de login
  document.getElementById('crearCuentaForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

// Manejo de la creación de cuenta
document.getElementById('crearCuentaForm').addEventListener('submit', function(e) {
  e.preventDefault();
      
  const nuevoUsuario = document.getElementById('nuevoUsuario').value;
  const nuevaContrasena = document.getElementById('nuevaContrasena').value;
  const confirmarContrasena = document.getElementById('confirmarContrasena').value;

  // Verificar que las contraseñas coincidan
  if (nuevaContrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Crear la cuenta con Firebase Authentication
  auth.createUserWithEmailAndPassword(nuevoUsuario, nuevaContrasena)
    .then((userCredential) => {
      alert(`Cuenta creada para ${userCredential.user.displayName || nuevoUsuario}!`);
      // Volver al formulario de login
      document.getElementById('crearCuentaForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error al crear cuenta", error);
      alert("Error al crear cuenta: " + error.message);
    });
});
