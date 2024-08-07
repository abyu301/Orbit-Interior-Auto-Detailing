const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this line
const app = express();
const port =  3001;

app.use(bodyParser.json());
app.use(cors());  // Add this line

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ezezew02@gmail.com', // Replace with your email
        pass: 'Anto03.bubu'   // Replace with your email password (consider using environment variables for security)
    }
});

app.post('/api/send-email', (req, res) => {
    const formData = req.body;

    const mailOptions = {
        from: 'ezezew02@gmail.com',
        to: 'ezezew02@gmail.com',
        subject: 'New Car Detailing Appointment',
        text: `New appointment details:
               Name: ${formData.first_name}
               Phone: ${formData.phone}
               Email: ${formData.email}
               Address: ${formData.address}
               Vehicle Type: ${formData.vehicle_type}
               Package: ${formData.package}
               Appointment Date: ${formData.appointment_date}
               Appointment Time: ${formData.appointment_time}
               Vehicle Model: ${formData.vehicle_model}
               Vehicle Year: ${formData.vehicle_year}
               Additional Requirements: ${formData.additional_requirements}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ success: false, message: error.toString() });
        }
        console.log('Email sent:', info.response);
        res.send({ success: true, message: 'Email sent: ' + info.response });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
