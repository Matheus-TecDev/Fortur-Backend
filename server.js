const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Configurar transporte de e-mail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para outros
    auth: {
      user: 'matheusfmc2005@gmail.com', // Seu e-mail
      pass: 'sua_senha_de_app' // Sua senha de e-mail (use senhas de app ou OAuth)
    }
  });

  const mailOptions = {
    from: email, // E-mail do remetente (usuário que preencheu o formulário)
    to: 'matheusfmc2005@gmail.com', // E-mail destinatário (você)
    subject: `Nova mensagem de ${name}`, // Assunto do e-mail
    text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nMensagem: ${message}` // Conteúdo do e-mail
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, error });
    }
    res.status(200).send({ success: true, info });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


