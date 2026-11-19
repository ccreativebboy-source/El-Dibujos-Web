// Interactividad de Boton Hamburguesa
document.addEventListener('DOMContentLoaded', () => {
  const todosLosSelects = document.querySelectorAll('.ContenedorSelect');

  todosLosSelects.forEach(contenedor => {
    const btn = contenedor.querySelector('button');
    const menu = contenedor.querySelector('.selectMenu');
    const selectedText = contenedor.querySelector('.selecText');
    const options = contenedor.querySelectorAll('.optionSelect');

    // Abrir/cerrar este menú específico
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Cierra cualquier otro menú abierto
      todosLosSelects.forEach(otro => {
        if (otro !== contenedor) {
          otro.querySelector('.selectMenu').classList.remove('abierto');
        }
      });

      menu.classList.toggle('abierto');
    });

    // Seleccionar opción e ir al enlace si lo tiene definido
    options.forEach(option => {
      option.addEventListener('click', () => {
        const url = option.getAttribute('data-url');
        if (url) {
          window.location.href = url;
        } else {
          selectedText.textContent = option.textContent;
          menu.classList.remove('abierto');
          console.log("Valor seleccionado:", option.getAttribute('data-value'));
        }
      });
    });
  });

  // Cerrar todos los menús al hacer clic afuera
  window.addEventListener('click', () => {
    todosLosSelects.forEach(contenedor => {
      const menu = contenedor.querySelector('.selectMenu');
      if (menu) menu.classList.remove('abierto');
    });
  });
});


// Misma Interactividad pero con un boton (Buzon.html)
document.addEventListener('DOMContentLoaded', () => {
  const botonesProyectos = document.querySelectorAll(".cajaProyectos .linkProyecto");

  botonesProyectos.forEach(linkbtn => {
    linkbtn.addEventListener('click', () => {
      const url = linkbtn.getAttribute('data-url');
      if (url) {
        // Abre el enlace en una pestaña nueva (ideal para YouTube)
        window.open(url, '_blank');
        
        // O si prefieres que se abra en la misma pestaña, descomenta la línea de abajo y comenta la de arriba:
        // window.location.href = url;
      }
    });
  });
});

// Para (Seccion Index.html)
document.addEventListener('DOMContentLoaded', () => {
  const botonesRegreso = document.querySelectorAll(".cajaHeader .CajaRegreso");

  botonesRegreso.forEach(linkbtn => {
    linkbtn.addEventListener('click', () => {
      const url = linkbtn.getAttribute('data-url');
      if (url) {
        // Abre el enlace en una pestaña nueva (ideal para YouTube)
        window.location.href = url;
        
        // O si prefieres que se abra en la misma pestaña, descomenta la línea de abajo y comenta la de arriba:
        // window.location.href = url;
      }
    });
  });
});