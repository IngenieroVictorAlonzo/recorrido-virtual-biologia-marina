import { connect } from "MP_SDK";


// ELEMENTOS DEL DOM

const iframe = document.getElementById("showcase-iframe");

const musica = document.getElementById("musica");
const btnAudio = document.getElementById("btnAudio");
const volumen = document.getElementById("volumen");


// CONFIGURACIÓN DEL AUDIO

musica.volume = 0.4;

// BOTÓN PLAY / PAUSE DEL AUDIO

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


// =====================================================
// CONTROL DE VOLUMEN
// =====================================================

volumen.addEventListener("input", () => {

    musica.volume = volumen.value;

    if (musica.volume === 0) {

        btnAudio.textContent = "🔇";

    } else if (!musica.paused) {

        btnAudio.textContent = "🔊";

    }

});


// =====================================================
// CONEXIÓN CON MATTERPORT
// =====================================================

async function conectarMatterport() {

    try {

        console.log("Conectando con Matterport...");

        const mpSdk = await connect(iframe);

        console.log("✅ Matterport SDK conectado");

        console.log(mpSdk);


        // EVENTOS DEL GUIDED TOUR

        mpSdk.on(mpSdk.Tour.Event.STARTED, async () => {
            console.log("▶️ Guided Tour INICIADO");
            try {

                await musica.play();

                btnAudio.textContent = "🔊";

                console.log("🎵 Música iniciada");

            } catch (error) {

                console.warn(
                    "⚠️ El navegador bloqueó la reproducción automática.",
                    error
                );
            }
        });

        mpSdk.on(mpSdk.Tour.Event.STOPPED, () => {
            console.log("⏸️ Guided Tour DETENIDO");

            musica.pause();

            btnAudio.textContent = "🔇";
        });

        mpSdk.on(mpSdk.Tour.Event.ENDED, () => {
            console.log("🏁 Guided Tour TERMINADO");

            musica.pause();

            btnAudio.textContent = "🔇";
        });

        mpSdk.on(mpSdk.Tour.Event.STEPPED, (activeIndex) => {
            console.log("📍 Guided Tour paso:", activeIndex);
        });

    } catch (error) {

        console.error(
            "❌ Error conectando con Matterport SDK:",
            error
        );

    }

}


// =====================================================
// INICIAR
// =====================================================

conectarMatterport();
