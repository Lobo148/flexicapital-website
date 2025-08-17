/*
 * scripts.js
 *
 * Este archivo contiene la lógica del simulador de crédito y el envío
 * de mensajes a WhatsApp. Calcula pagos aproximados para productos
 * diarios y semanales y genera un enlace preconfigurado para
 * contactar a FlexiCapital a través de WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  const amountSlider = document.getElementById('amount');
  const amountValue = document.getElementById('amountValue');
  const periodSelect = document.getElementById('period');
  const resultContainer = document.getElementById('result');
  const contactForm = document.getElementById('contactForm');

  /**
   * Actualiza el texto que muestra el valor seleccionado del slider
   * y recalcula el pago estimado según el periodo seleccionado.
   */
  function updateSimulator() {
    const amount = parseInt(amountSlider.value, 10);
    amountValue.textContent = `$${amount.toLocaleString('es-MX')}`;
    const period = periodSelect.value;
    let payment;
    let paymentLabel;
    // Cálculo simple de interés: 10% para créditos semanales (pagados en 4 semanas)
    // y 20% para créditos diarios (pagados en 30 días)
    if (period === 'weekly') {
      const total = amount * 1.10;
      payment = total / 4; // pago por semana (4 semanas)
      paymentLabel = 'pago semanal';
    } else {
      const total = amount * 1.20;
      payment = total / 30; // pago diario (30 días)
      paymentLabel = 'pago diario';
    }
    resultContainer.textContent = `Monto seleccionado: $${amount.toLocaleString('es-MX')} MXN \u2013 ${paymentLabel}: $${payment.toFixed(2)} MXN`;
  }

  // Vincula los eventos
  amountSlider.addEventListener('input', updateSimulator);
  periodSelect.addEventListener('change', updateSimulator);

  // Invoca la función una vez para inicializar
  updateSimulator();

  /**
   * Captura el envío del formulario de contacto y genera un enlace
   * para enviar la solicitud vía WhatsApp con el número proporcionado.
   */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const amountRequested = amountSlider.value;
    // Crea el texto del mensaje para WhatsApp
    const text =
      `Hola, mi nombre es ${name}. Me interesa solicitar un crédito de $${parseInt(amountRequested, 10).toLocaleString('es-MX')} MXN. ` +
      (message ? `Mensaje: ${message}. ` : '') +
      `Mi correo es ${email}. ¡Gracias!`;
    const encodedText = encodeURIComponent(text);
    // Número de contacto de FlexiCapital (México) con prefijo 52
    const whatsappUrl = `https://wa.me/524888898698?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  });
});