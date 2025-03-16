export class Template {
    getOtpTemplate(data) {
        if (!data) {
            throw new Error("Data Not Found ");
        }
        let template = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.subject}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3edea;
            text-align: center;
            padding: 20px;
            color: #4a4a4a;
        }
        .container {
            max-width: 450px;
            background: #ffffff;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
            border-top: 6px solid #8e44ad;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #8e44ad;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            font-size: 26px;
            font-weight: bold;
            color: #8e44ad;
            margin: 15px 0;
            background: #f2e6f7;
            display: inline-block;
            padding: 12px 24px;
            border-radius: 8px;
        }
        .footer {
            margin-top: 25px;
            font-size: 13px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">OTP Verification</div>
        <p class="content">Dear <strong>${data.name}</strong>,</p>
        <p class="content">Your One-Time Password (OTP) for verification on <strong>${data.appName}</strong> is:</p>
        <p class="highlight">${data.otp}</p>
        <p class="content">Please enter this OTP to complete your verification. Do not share it with anyone.</p>
        <p class="footer">If you did not request this, please ignore this email.</p>
        <hr>
        <p class="footer">&copy; ${data.year} <strong>${data.appName}</strong>. All rights reserved.</p>
    </div>
</body>
</html>
`
        return template;
    }

    meditationNotification(data) {
        if (!data) {
            throw new Error("Data Not Found");
        }
        let template = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.subject}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f7fa;
            text-align: center;
            padding: 20px;
            color: #4a4a4a;
        }
        .container {
            max-width: 450px;
            background: #ffffff;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
            border-top: 6px solid #42a5f5;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #42a5f5;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
            background: #42a5f5;
            display: inline-block;
            padding: 12px 24px;
            border-radius: 8px;
            margin: 15px 0;
            text-decoration: none;
        }
        .footer {
            margin-top: 25px;
            font-size: 13px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Your Meditation Awaits</div>
        <p class="content">Dear <strong>${data.name}</strong>,</p>
        <p class="content">It's time to take a deep breath and find your inner peace with today's meditation session on <strong>${data.sessionTitle}</strong>.</p>
        <a class="highlight" href="${data.sessionLink}">Start Meditation</a>
        <p class="content">Make time for yourself and embrace the tranquility.</p>
        <p class="footer">If you have any questions, feel free to reach out to us.</p>
        <hr>
        <p class="footer">&copy; ${data.year} <strong>${data.appName}</strong>. All rights reserved.</p>
    </div>
</body>
</html>`;
        return template;
    }

    forgotPassword(data) {
        if (!data) {
            throw new Error("Data Not Found ");
        }
        let template = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e3f2fd;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            background: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin: auto;
            border-top: 5px solid #1e88e5;
        }
        .otp-code {
            font-size: 28px;
            font-weight: bold;
            color: #1e88e5;
            margin: 20px 0;
            background: #bbdefb;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 13px;
            color: #555;
        }
        h2 {
            color: #1e88e5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Forgot Password</h2>
        <p>Dear <strong>${data.name}</strong>,</p>
        <p>You have requested to reset your password for <strong>${data.appName}</strong>. Use the OTP below to proceed:</p>
        <p class="otp-code">${data.otp}</p>
        <p>If you did not request this, please ignore this email. Your account security is important to us.</p>
        <hr>
        <p class="footer">&copy; ${data.year} <strong>${data.appName}</strong>. All rights reserved.</p>
    </div>
</body>
</html>
`
        return template;
    }



    AcceptRequest(data) {
        if (!data) {
            throw new Error("Data Not Found ");
        }
        let template = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Accepted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e3f2fd;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            background: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin: auto;
            border-top: 5px solid #1e88e5;
        }
        .request-title {
            font-size: 22px;
            font-weight: bold;
            color: #1e88e5;
            margin: 20px 0;
            background: #bbdefb;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 13px;
            color: #555;
        }
        h2 {
            color: #1e88e5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Request Accepted</h2>
        <p>Dear <strong>${data.name}</strong>,</p>
        <p>Your request titled:</p>
        <p class="request-title">${data.title}</p>
        <p>has been accepted by <strong>${data.help_seeker}</strong>.</p>
        <p><strong>Contact:</strong> ${data.contact}</p>
        <p>Please connect with <strong>${data.help_seeker}</strong> to proceed further.</p>
        <p class="footer">If you have any questions, feel free to reach out to us.</p>
        <hr>
        <p class="footer">&copy; ${data.year} <strong>${data.appName}</strong>. All rights reserved.</p>
    </div>
</body>
</html>
`
        return template;
    }



    RejectRequest(data) {
        if (!data) {
            throw new Error("Data Not Found ");
        }
        let template = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Accepted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e3f2fd;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            background: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin: auto;
            border-top: 5px solid #1e88e5;
        }
        .request-title {
            font-size: 22px;
            font-weight: bold;
            color: #1e88e5;
            margin: 20px 0;
            background: #bbdefb;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 13px;
            color: #555;
        }
        h2 {
            color: #1e88e5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Request Rejected</h2>
        
        <p>Dear <strong>${data.help_provider}</strong>,</p>
        <p>Your request titled:</p>
        <p class="request-title">${data.help}</p>
        <p>has been Rejected by <strong>${data.help_seeker}</strong>.</p>
        <p class="footer">If you have any questions, feel free to reach out to us.</p>
        <hr>
        <p class="footer">&copy; ${data.year} <strong>${data.appName}</strong>. All rights reserved.</p>
    </div>
</body>
</html>
`
        return template;
    }
}