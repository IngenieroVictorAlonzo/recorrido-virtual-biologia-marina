const iframe = document.getElementById("showcase-iframe");
const musica = document.getElementById("musica");
const btnAudio = document.getElementById("btnAudio");
const volumen = document.getElementById("volumen");
const btnIniciar = document.getElementById("btnIniciar");
const intro = document.getElementById("intro");


// ------------------------------------
// CONFIGURACIÓN INICIAL
// ------------------------------------

musica.volume = 0.4;

// ------------------------------------
// URL DE MATTERPORT
// ------------------------------------

const matterportURL =
    "https://my.matterport.com/show/?m=p3ZYaTnMP9m&qs=1&play=1&ts=3";


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