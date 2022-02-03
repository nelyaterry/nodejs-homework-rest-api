const sgMail = require("@sendgrid/mail");

const { SWNGRID_API_KEY } = process.env;

sgMail.setApiKey(SWNGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "119nelyaterry@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
