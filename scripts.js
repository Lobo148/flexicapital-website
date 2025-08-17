/*
  scripts.js

  Este archivo contiene lógica de interfaz de usuario simple para el
  sitio FlexiCapital. Gestiona la apertura y cierre del menú
  responsive y actualiza el año actual en el pie de página.
*/

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');

  // Alterna la visibilidad del menú en dispositivos móviles
  menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('open');
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener('click', (event) => {
    const isClickInsideNav = navigation.contains(event.target);
    const isClickToggle = menuToggle.contains(event.target);
    if (!isClickInsideNav && !isClickToggle && navigation.classList.contains('open')) {
      navigation.classList.remove('open');
    }
  });

  // Establece el año actual automáticamente en el pie de página
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});