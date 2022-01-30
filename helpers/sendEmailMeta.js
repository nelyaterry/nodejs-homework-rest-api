const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const sendEmailMeta = async (data) => {
  const nodemailerConvig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "nelyaterry@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConvig);

  const email = { ...data, from: "nelyaterry@meta.ua" };

  try {
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmailMeta;
