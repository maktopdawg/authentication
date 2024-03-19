import nodemailer from "nodemailer"
import Account from "@/models/Account";
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        
        if (emailType === "VERIFY") {
            await Account.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }, {
                new: true,
                runValidators: true
            })
        } else if (emailType === "RESET") {
            await Account.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000
            }, {
                new: true,
                runValidators: true
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              // Put in .env file
              user: "2862d58dea3fe0",
              pass: "220d8082bfcc0e"
            }
        });

        const mailOptions = {
            from: 'revealersmedia@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
            <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
            or copy and paste link in browser. <br /> 
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>
            `
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}