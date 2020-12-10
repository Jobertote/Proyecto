window.onload = inicializar;
const db = firebase.firestore();
const contenidoContainer = document.getElementById('contenido-container');
const contenidoPerfil = document.getElementById('nombre-usuario');
const desplegar = document.getElementById('CssCaja');
let textNota;


//Contenendor de imagen
const imagePreview = document.getElementById('img-preview');
const imageUploader = document.getElementById('img-uploader');
var imagenesContenidoRef;

function inicializar() {

    storageRef = firebase.storage().ref();



    imagenesContenidoRef = firebase.database().ref().child("contenido");
    textNota = document.getElementById('descripcion-pub');

    init();
}


//Guardar referencias en una coleccion
const saveContenido = (nombre, url, uid, name, descripcion) =>
    db.collection('contenidos').doc().set({
        nombre: nombre,
        url: url,
        uid: uid,
        nombreusuario: name,
        descripcion : descripcion



    })

//Guardar nombre en una coleccion
const saveName = (nombre, plataforma, uid) =>
    db.collection('users').doc().set({
        nombre: nombre,
        plataforma: plataforma,
        uid: uid
    })

//Traer contenido de BD



/*
const getNombre = () => db.collection('users').get();
        window.addEventListener('DOMContentLoaded', async (e) => {
            const querySnapshot = await getNombre();
            querySnapshot.forEach(doc => {
                console.log(doc.data());
                const IDUsuario = doc.data().uid;
                const nombreUser = doc.data().nombre;
                var user = firebase.auth().currentUser;
                var uid2;
                uid2 = user.uid;
                if (uid2 == IDUsuario) {
                    console.log(nombreUser);
                } else {

                }

            })
        })
*/

function nombreNone() {
    document.querySelector('#nombre-usuario').style.display = 'none';
}
function nombreBlock() {
    document.querySelector('#nombre-usuario').style.display = 'block';
}


function contenidoBDNone() {
    document.querySelector('#CssCaja').style.display = 'none';
}
function contenidoBDBlock() {
    document.querySelector('#CssCaja').style.display = 'block';
}

const getContenido = () => db.collection('contenidos').get();
window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getContenido();
    querySnapshot.forEach(doc => {
        console.log(doc.data());
        

        desplegar.innerHTML += `
        <div class="desplegar-publicaciones" id="desplegar-publicaciones">
            <div class="datos-pub">
                <img src="https://i.pinimg.com/736x/49/39/b1/4939b174ee2a4039228cfe88cfd188ba.jpg" alt="" class="foto-pub">
                <p class="nombre-usuario-pub">${doc.data().nombreusuario}</p>
                <p class="descripcion-usuario-pub">${doc.data().descripcion}</p>
            </div>
            <div class="conten-video">
                <div class="container" id="contenido-container"><video src="${doc.data().url}"  width=350  height=200 controls >
                </div>
            </div>
        </div>`
        //contenidoContainer.innerHTML += `<p>${doc.data().nombreusuario}</p>`
        //contenidoContainer.innerHTML += `<li class=""><video src="${doc.data().url}" width=320  height=240 controls ></li>`
    })
})






const loggedOutLink = document.querySelectorAll('.logged-out')
const loggedInLink = document.querySelectorAll('.logged-in')


var constanteRuta;

const loginCheck = user => {
    if (user) {
        loggedInLink.forEach(link => link.style.display = 'block');
        loggedOutLink.forEach(link => link.style.display = 'none');
        mostrar();
        contenidoBDBlock();
        nombreBlock();
        

        


        

    } else {
        loggedInLink.forEach(link => link.style.display = 'none');
        loggedOutLink.forEach(link => link.style.display = 'block');
        init();
        contenidoBDNone();
        nombreNone();

    }
}

function init() {
    document.querySelector('#video').style.display = 'none';
}

function mostrar() {
    document.querySelector('#video').style.display = 'block';
}

//Iniciar sesion

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    const nombre = document.querySelector('#signup-name').value;
    const plataforma = document.querySelector('#plataforma').value;



    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {

            signupForm.reset();

            $('#signupModal').modal('hide')

            console.log('signup')

            var user = firebase.auth().currentUser;
            var uid;
            uid = user.uid;

            saveName(nombre, plataforma, uid);

            setTimeout('document.location.reload()',1000);
        })


});

//Registrarse
const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {

            signupForm.reset();

            $('#signinModal').modal('hide')

            console.log('signIn')

            setTimeout('document.location.reload()',1000);
        })

        

})

const logout = document.querySelector('#Logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('Sign out')

        setTimeout('document.location.reload()',1000);
    })
})



//Publicaciones

const postList = document.querySelector('.posts');
const setupPosts = data => {
    if (data.length) {
        let html = '';
        /*
        data.forEach(doc => {
            const post = doc.data()
            console.log(post)
            
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5>${post.titulo}</h5>
                    <p>${post.descripcion}</p>
                </li>
            `;
            html += li;
            
        });*/
        postList.innerHTML = html;
    } else {
        postList.innerHTML = '<p class="text-center" >Inicia sesion para ver las publicaciones</p>';
    }
}



//Eventos
//Usuarios autentificados

auth.onAuthStateChanged(user => {
    if (user) {
        fs.collection('posts')
            .get()
            .then((snapshot) => {
                setupPosts(snapshot.docs)
                loginCheck(user);
            })
    } else {
        setupPosts([])
        loginCheck(user);
    }
})










//Extraer atributos de la imagen
/*

imageUploader.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log(file);
});

*/

const getNombre = () => db.collection('users').get();
window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getNombre();
    querySnapshot.forEach(doc => {
        console.log(doc.data());
        const IDUsuario = doc.data().uid;
        const nombreUser = doc.data().nombre;
        var user = firebase.auth().currentUser;
        var uid2;
        uid2 = user.uid;
        if (uid2 == IDUsuario) {
            console.log(nombreUser);
            contenidoPerfil.innerHTML += `${nombreUser}`




            uploadProfileImg = function () {

                var user = firebase.auth().currentUser;


                var file2 = ($('#img-uploader'))[0].files[0];


                nuevotexto = {
                    texto : textNota.value
                }

                if (!file2) {

                } else {
                    var ruta = storage.ref('/userProfileImgs/' + file2.name);

                    var uploadTask = ruta.put(file2);

                    uploadTask.on('state_changed', function (snapshot) {

                    }, function (error) {
                        console.log(error);
                    }, function () {
                        console.log('Archivo o imagen subida a Firebase');

                        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                            this.constanteRuta = url;
                            console.log(this.constanteRuta);

                            var nombre2 = file2.name;

                            console.log(nombre2);

                            //crearNodoFirebase(file2.name, this.constanteRuta)


                            var user = firebase.auth().currentUser;
                            var uid;
                            uid = user.uid;





                            saveContenido(nombre2, this.constanteRuta, uid, nombreUser, nuevotexto.texto);

                            setTimeout('document.location.reload()',5000);
                        })





                    });
                }

            };


        } else {

        }

    })
})





//Subir contenido a Realtime Database
function crearNodoFirebase(nombreContenido, ruta) {
    imagenesContenidoRef.push({ nombre: nombreContenido, url: ruta });
}



//Imprimir nombre de usuario

function printNombre() {
    var user = firebase.auth().currentUser;
}






