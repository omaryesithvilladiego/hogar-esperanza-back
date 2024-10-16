const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail', // Usamos el servicio de Gmail
  auth: {
    user: 'villadiegoomar78@gmail.com', // Tu dirección de correo de Gmail
    pass: 'wjia mzwj dvbj pxty', // Usa la contraseña de aplicación si tienes 2FA activada
  },

});

// Verificar la conexión
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Servidor listo para enviar mensajes");
  }
});

module.exports = transporter;
