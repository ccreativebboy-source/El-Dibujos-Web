document.addEventListener('DOMContentLoaded', () => {
  const todosLosSelects = document.querySelectorAll('.custom-select-container');

  todosLosSelects.forEach(contenedor => {
    const btn = contenedor.querySelector('button');
    const menu = contenedor.querySelector('.custom-select-menu');
    const selectedText = contenedor.querySelector('.selected-text');
    const options = contenedor.querySelectorAll('.custom-select-option');

    // Abrir/cerrar este menú específico
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Cierra cualquier otro menú abierto
      todosLosSelects.forEach(otro => {
        if (otro !== contenedor) {
          otro.querySelector('.custom-select-menu').classList.remove('abierto');
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
      const menu = contenedor.querySelector('.custom-select-menu');
      if (menu) menu.classList.remove('abierto');
    });
  });
});