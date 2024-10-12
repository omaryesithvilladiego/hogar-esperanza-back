const mongoose = require("mongoose");

// Expresión regular para validar un número de teléfono celular (Ej. solo acepta 10 dígitos)
const phoneRegex = /^\d{10}$/;

// Expresión regular para validar un correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "El nombre completo es requerido"],
        minlength: [1, "El nombre completo no puede estar vacío"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es requerido"],
        validate: {
            validator: function(v) {
                return emailRegex.test(v);
            },
            message: "El correo electrónico debe ser válido"
        }
    },
    phone: {
        type: String,
        required: [true, "El número de teléfono celular es requerido"],
        validate: {
            validator: function(v) {
                return phoneRegex.test(v);
            },
            message: "El número de teléfono celular debe tener 10 dígitos"
        }
    },
    age: {
        type: Number,
        min: [18, "La edad mínima es 18 años"],
        max: [120, "La edad máxima es 120 años"],
        required: [true, "La edad es requerida"]
    },
    plan: {
        type: String,
        required: [true, "El plan es requerido"],
        enum: {
            values: ['Hogar permanente compartido', 'Hogar permanente VIP', 'Hogar permanente VIP compartido','Hogar de vacaciones'],
            message: 'el plan no es correcto'
        }
    }
});

module.exports = userSchema