const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailModule = {};

emailModule.sendResetPasswordEmail = (email, password) => {
  sgMail
    .send({
      to: email,
      from: "noar.s.rassam@gmail.com",
      subject: "Reset Password",
      text: `Hello. <br> Welocome to Reset Password. <br> Your new password is: ${password} `,
      html: `<p>Hello. <br> Welocome to Reset Password. <br>Your new password is: <b>${password}</b></p>`,
    })
    .then(
      () => {
        console.log("Reset password Email sent successfully");
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
};

emailModule.sendEmail = (to, from, templateId, dynamic_template_data) => {
  const msg = {
    to,
    from: { name: "App", email: from },
    templateId,
    dynamic_template_data,
  };
  console.log(msg);
  sgMail
    .send(msg)
    .then((response) => {
      console.log("mail-sent-successfully", {
        templateId,
        dynamic_template_data,
      });
      console.log("response", response);
      /* assume success */
    })
    .catch((error) => {
      /* log friendly error */
      console.error("send-grid-error: ", error.toString());
    });
};

module.exports = emailModule;
