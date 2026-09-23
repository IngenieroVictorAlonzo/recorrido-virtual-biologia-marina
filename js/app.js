const iframe = document.getElementById("showcase-iframe");
const musica = document.getElementById("musica");
const btnAudio = document.getElementById("btnAudio");
const volumen = document.getElementById("volumen");
const btnIniciar = document.getElementById("btnIniciar");
const intro = document.getElementById("intro");
const final = document.getElementById("final");
const btnCerrarFinal = document.getElementById("btnCerrarFinal");

const DURACION_TOUR = 235000; // 3 minutos 55 segundos
let temporizadorFinal;

// ------------------------------------
// CONFIGURACIÓN INICIAL
// ------------------------------------

musica.volume = 0.4;


// ------------------------------------
// ESCUCHAR MENSAJES DE MATTERPORT
// ------------------------------------

window.addEventListener("message", (event) => {

    if (event.origin.includes("matterport.com")) {

        console.log("📩 MENSAJE DE MATTERPORT:");
        console.log(event.data);

    }

});



// ------------------------------------
// URL DE MATTERPORT
// ------------------------------------

const matterportURL =
    "https://my.matterport.com/show/?m=p3ZYaTnMP9m&qs=1&play=1&ts=2";


// ------------------------------------
// VIDEO DE INTRODUCCIÓN
// ------------------------------------

videoIntro.addEventListener("ended", () => {

    console.log("🎬 Video terminado");

    btnIniciar.style.display = "block";

});

// ------------------------------------
// BOTÓN "INICIAR RECORRIDO"
// ------------------------------------

btnIniciar.addEventListener("click", async () => {

    try {

        // Iniciar música
        await musica.play();

        btnAudio.textContent = "🔊";

        // Cargar Matterport
        iframe.src = matterportURL;

        // Ocultar pantalla inicial
        intro.classList.add("oculto");

        temporizadorFinal = setTimeout(() => {

            final.classList.add("visible");

        }, DURACION_TOUR);

    } catch (error) {

        console.error(
            "Error iniciando recorrido:",
            error
        );

    }

});


// ------------------------------------
// BOTÓN AUDIO
// ------------------------------------

btnAudio.addEventListener("click", async () => {

    if (musica.paused) {

        try {

            await musica.play();

            btnAudio.textContent = "🔊";

        } catch (error) {

            console.error(
                "No se pudo reproducir el audio:",
                error
            );

        }

    } else {

        musica.pause();

        btnAudio.textContent = "🔇";
    }

});


// ------------------------------------
// VOLUMEN
// ------------------------------------

volumen.addEventListener("input", () => {

    musica.volume = volumen.value;

    if (musica.volume === 0) {

        btnAudio.textContent = "🔇";

    } else if (!musica.paused) {

        btnAudio.textContent = "🔊";

    }

});


btnCerrarFinal.addEventListener("click", () => {

    final.classList.remove("visible");

});