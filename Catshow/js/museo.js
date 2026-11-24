// scrollear en vertical
document.addEventListener("wheel", function (event) {
    // Convertir el scroll vertical en horizontal
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();

        window.scrollBy({
            left: event.deltaY,
            behavior: "auto"
        });
    }
}, { passive: false });

// pinturas
document.addEventListener("DOMContentLoaded", () => {
    const cuadros = document.querySelectorAll(".Pinturas .cuadro");

    cuadros.forEach((cuadro) => {
        const img = cuadro.querySelector("img");
        if (!img) return;

        const ajustarTamano = () => {
            const ratio = img.naturalWidth / img.naturalHeight;

            if (ratio > 1.45) {
                // Imagen horizontal: ocupa 2 columnas
                cuadro.classList.add("ancha");
            } else if (ratio < 0.65) {
                // Imagen vertical larga: ocupa 2 filas
                cuadro.classList.add("alta");
            }
        };

        if (img.complete) {
            ajustarTamano();
        } else {
            img.addEventListener("load", ajustarTamano);
        }
    });
});

//musica automatica
document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById("musica-museo");
    if (!musica) return;

    musica.volume = 0.7; // Volumen inicial al 40% para no saturar

    const iniciarMusica = () => {
        musica.play().then(() => {
            // Una vez que suena, quitamos los listeners
            document.removeEventListener("click", iniciarMusica);
            document.removeEventListener("keydown", iniciarMusica);
            document.removeEventListener("wheel", iniciarMusica);
        }).catch(() => {
            // El navegador aún espera interacción del usuario
        });
    };

    // Intento automático al cargar
    iniciarMusica();

    // Respaldo al primer clic, tecla o scroll con la rueda
    document.addEventListener("click", iniciarMusica);
    document.addEventListener("keydown", iniciarMusica);
    document.addEventListener("wheel", iniciarMusica);
});

// scroll suavizado
document.addEventListener("DOMContentLoaded", () => {
    let posicionX = window.scrollX;
    let velocidadX = 0;

    // Parámetros ajustables de la física de hielo
    const aceleracion = 4.5;     // Impulso por cada toque de rueda
    const friccion = 0.945;      // 0.92 = frena antes | 0.965 = hielo muy largo
    const velocidadMax = 45;     // Límite para que no se dispare si giras muy rápido

    window.addEventListener("wheel", (e) => {
        // Detecta si se usó rueda vertical u horizontal
        let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (delta === 0) return;

        e.preventDefault();

        // Normaliza el valor según el tipo de dispositivo (ratón vs touchpad)
        if (e.deltaMode === 1) delta *= 32; // Modo líneas
        const direccion = Math.sign(delta);
        const intensidad = Math.min(Math.abs(delta) / 100, 1.5);

        // Suma impulso a la velocidad actual (efecto hielo)
        velocidadX += direccion * intensidad * aceleracion;

        // Limita la velocidad máxima
        velocidadX = Math.max(-velocidadMax, Math.min(velocidadMax, velocidadX));
    }, { passive: false });

    function actualizarHielo() {
        const maxScrollX = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);

        if (Math.abs(velocidadX) > 0.02) {
            posicionX += velocidadX;

            // Rebote suave o freno limpio en los bordes de la pared
            if (posicionX < 0) {
                posicionX = 0;
                velocidadX = 0;
            } else if (posicionX > maxScrollX) {
                posicionX = maxScrollX;
                velocidadX = 0;
            } else {
                velocidadX *= friccion;
            }

            window.scrollTo({
                left: posicionX,
                behavior: "instant" // Fuerza movimiento directo sin pelea con CSS
            });
        } else {
            velocidadX = 0;
        }

        requestAnimationFrame(actualizarHielo);
    }

    // Actualiza el límite si cambias el tamaño de la ventana
    window.addEventListener("resize", () => {
        const maxScrollX = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
        if (posicionX > maxScrollX) posicionX = maxScrollX;
    });

    actualizarHielo();
});

//mirar pintura a detalle
// --- VISOR DE PINTURA EN EL CENTRO ---
    const visor = document.createElement("div");
    visor.className = "visor-obra";
    visor.innerHTML = `
        <button class="visor-cerrar" type="button" aria-label="Cerrar">✕ Cerrar</button>
        <div class="visor-contenido">
            <img src="" alt="">
            <p class="visor-titulo"></p>
        </div>
    `;
    document.body.appendChild(visor);

    const visorImg = visor.querySelector("img");
    const visorTitulo = visor.querySelector(".visor-titulo");
    const btnCerrar = visor.querySelector(".visor-cerrar");

    function abrirVisor(imgElement) {
        visorImg.src = imgElement.src;
        visorImg.alt = imgElement.alt || "Obra del museo";
        visorTitulo.textContent = imgElement.alt || "";
        visorTitulo.style.display = imgElement.alt ? "block" : "none";
        visor.classList.add("activo");
    }

    function cerrarVisor() {
        visor.classList.remove("activo");
    }

    // Abre al hacer clic en cualquier imagen dentro de .Pinturas
    document.querySelectorAll(".Pinturas img").forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            abrirVisor(img);
        });
    });

    // Cierra al hacer clic en el botón, en el fondo oscuro o con la tecla Escape
    btnCerrar.addEventListener("click", cerrarVisor);
    visor.addEventListener("click", (e) => {
        if (e.target === visor) cerrarVisor();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && visor.classList.contains("activo")) {
            cerrarVisor();
        }
    });