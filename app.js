function registrar(){
    var email = document.getElementById('email').value
    var contrasena = document.getElementById('contrasena').value

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    
    .then(function(){
        enviarCorreo()
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

function acceder(){
    var email2 = document.getElementById('email2').value
    var contrasena2 = document.getElementById('contrasena2').value

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

//El observador me permite ver el estatus de la persona si se conecta bien o no. /the observer allows me to see the person if it connects well or not

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            contenidoWeb(user)
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('No ha podido acceder')
        }
      });
}
observador() //Inicialización del observador, para que cuando se inicie la pagina, el observador este monitoreando. / Initialization of the observer, so that when the page starts, the observer is monitoring

function contenidoWeb(user){
    var user = user
    var contenido = document.getElementById('contenido')

    if(user.emailVerified){
        contenido.innerHTML = `
            <h5>Bienvenido</h5>
            <button onclick="cerrarSesion()">Cerrar Sesión</button>
        `
    }
}

//Se declara el cierre de la sesión una vez abierta

function cerrarSesion(){
    firebase.auth().signOut()
    .then(function(){
        console.log("Saliendo...")
    })
    .catch(function(error){
        console.log(error)
    })
}

function enviarCorreo(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification()
    .then(function() {
    // Email sent.
        console.log('Enviando correo...')
    }).catch(function(error) {
    // An error happened.
    });
}