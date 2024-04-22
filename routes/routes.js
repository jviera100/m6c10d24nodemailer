import { Router } from "express";
import nodemailer from 'nodemailer';
import 'dotenv/config';

const router = Router();

// Configurar el transporte SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PAST,
  },
});

// Definir las opciones del correo electrónico
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'Hola, esto es una prueba',
  html: '<h1>Hola mundo</h1>',
};

router.get("/", (req, res) => {
  res.send("Hola mundo desde el router");
});

router.get('/enviar', (req, res) => {
  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
      res.status(500).send("Error al enviar el correo electrónico");
    } else {
      console.log("Correo electrónico enviado:", info.response);
      res.send("Correo electrónico enviado correctamente");
    }
  });
});

export default router;
