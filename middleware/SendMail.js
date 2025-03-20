import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

export class Gmail {
    async mail(data,template) {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: true,
        });
        const mailData = {
            from: 'soulspace.app.team@gmail.com',  // sender address
            to: data.email,   // list of receivers
            subject: 'SoulSpace OTP Verification – Complete Your Signup',
          html: template 
        };
    
    transporter.sendMail(mailData, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    return;
}

//Function to Send Notifications
async sendNotification(data, template) {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        secure: true,
    });

    const mailData = {
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "SoulSpace Meditation Notification",
        html: template,
    };

    transporter.sendMail(mailData, function(err, info) {
        if (err) console.log("Notification Error:", err);
        else console.log(`Notification sent to ${email}:`, info.response);
    });
}


generateOtp(limit, type = "digit") {
    let characters = "0123456789";
    if (type === "string") {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    let otp = "";
    for (let i = 0; i < limit; i++) {
        otp += characters[Math.floor(Math.random() * characters.length)];
    }
    return otp;
}

}