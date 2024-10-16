const transporter  = require('../config/mail');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken'); // Asegúrate de importar jwt
const programs = require('../data/dataPrograms')

const createUser = async (user) => {
    try {
        const userCreate = new UserModel(user);
        const info = await transporter.sendMail({
            from: '<villadiegoomar78@gmail.com>', // dirección del remitente
            to: [userCreate.email], // lista de destinatarios
            subject: `Información sobre el plan: ${userCreate.plan}`, // Asunto del correo
            text: `Hola, ${userCreate.name}. Aquí tienes la información sobre el plan que seleccionaste: ${userCreate.plan}.`, // cuerpo de texto plano
            html: generateEmailContent(userCreate.plan), // cuerpo HTML generado dinámicamente
          });
          
          // Función para generar el contenido del correo en HTML
          function generateEmailContent(planName) {
            const plan = programs.find(p => p.nombre === planName);
          
            if (!plan) {
              return `<p>No se encontró información para el plan: ${planName}</p>`;
            }
          
            return `
              <div style="padding: 20px; color: #333;">
                <img src="https://firebasestorage.googleapis.com/v0/b/hogaresperanza-8f8ea.appspot.com/o/IMG_1190.PNG?alt=media&token=c313bd2e-b00c-413d-ac31-50201b059e73" alt="Logo Hogar Esperanza" style="width: 30px; height: auto; vertical-align: middle;" />
               
                <h1 style="text-align: center; color: green;">¡Bienvenido/a a Fundación Hogar Esperanza!</h1>
                <p style="font-size: 16px; color: black;">Estamos comprometidos con brindarle la mejor experiencia y atención posible.</p>
                <p style="font-size: 16px; color: black;">Agradecemos su interés en nuestros planes y servicios. Nuestro equipo se comunicará con usted pronto para discutir cómo podemos ayudarle.</p>
                <h2 style="color: green;">Mientras tanto, aquí tienes todo lo que incluye el plan del que estás interesado:</h2>
                <h1 style="text-align: center; color: green;">${plan.nombre}</h1>
                <p style="font-size: 16px; color: black;">${plan.descripcion}</p>
                <h2 style="color: green;">Incluye:</h2>
                <ul style="font-size: 16px; color: black; list-style-type: disc; margin-left: 20px;">
                  ${plan.incluye.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <p style="font-size: 14px; color: black; margin-top: 20px;">¡Gracias por confiar en nosotros!</p>
              </div>
            `;
          }
          
          
          
          
          
          
        
          console.log("Message sent: %s", info);
        const userSaved = await userCreate.save();
        if(!userSaved) throw new Error('Hubo un error al guardar el usuario')
        return userSaved
        // Responde al cliente solo después de que el correo haya sido enviado
    } catch (error) {
     throw error
    }
};

const userLogin = async (user) => {
    const { password, email } = user;
    try {
        if (!email || !password) throw new Error('Las credenciales son requeridas');
        
        const userFound = await UserModel.findOne({ email });
        if (!userFound) throw new Error('Credenciales incorrectas');

        const userLoginFound = await UserModel.findOne({ email, password });
        if (!userLoginFound) throw new Error('Credenciales incorrectas');

        return jwt.sign({
            id: userLoginFound._id,
            email: userLoginFound.email
        }, "__recret__", { expiresIn: "12h" });
    } catch (error) {
        throw new Error(error.message); // Cambia a `new Error` para asegurar que se lanza un error correcto
    }
};

module.exports = {
    create: createUser
};
