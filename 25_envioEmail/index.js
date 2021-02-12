const nodemailer = require("nodemailer");

// funciona através do transporter, entregando emails

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: { rejectUnauthorized: false },
  auth: {
    user: "lcds90@gmail.com",
    pass: "Amor!251015",
  },
});

transporter
  .sendMail({
    from: "Leonardo Santos <lcds90@gmail.com>",
    to: "lcds07@gmail.com, lcds90@gmail.com",
    subject: "Oi, sou o Leonardo e estou usando o nodeMailer!",
    html:
      "Its <b>hands</b> were holograms that altered to match the convolutions of the bright void exless and inhumanly patient, his primary gratification seemed to he in his capsule in some coffin hotel, his hands clawed into the shadow of the console",
  })
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.log(err);
  });