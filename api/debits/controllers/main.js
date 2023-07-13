const moment = require("moment/moment");
const sgMail = require('@sendgrid/mail');


module.exports = {
    list: async (req, res) => {
        try {

            let user = req?.user

            let debits = await framework.services.debits.basic.fetch(user);
            if (!debits.length) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                });
            } else {
                let data = debits.map((student) => {
                    let totalAmount = 0;
                    let totalPaidAmount = 0;
                    let valid = false;

                    student?.studentFormula?.forEach((plan) => {
                        let today = moment();
                        let planDate = moment(plan?.date);
                        let dayDiff = today.diff(planDate, 'days');
                        if (dayDiff >= 15) {
                            valid = true;
                        }
                        totalAmount += plan?.quantity * plan?.formulaId?.price;
                        plan?.studentFormulaPayment?.forEach((payment) => {
                            totalPaidAmount += payment?.amount;
                        });
                    });

                    return {
                        id: student?.id,
                        firstname: student?.firstname,
                        lastname: student?.lastname,
                        email: student?.email,
                        date_code: moment(student?.date_code).format("YYYY-DD-MM"),
                        debitAmount: totalAmount - totalPaidAmount,
                        valid: valid,
                    };
                });
                res.status(200).json({
                    message: '',
                    error: false,
                    data: data
                });
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                message: error?.message,
                error: true,
                data: error
            });
        }
    },
    sendEmail: async (req, res) => {
        try {
            let data = req.body;
            if (!data.email || !data.debitAmount) {
                return res.status(400).json({
                    message: 'invalid data for send email',
                    error: true,
                    data: []
                })
            }

            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: data.email, // Change to your recipient
                from: 'rajanvasani9@gmail.com', // Change to your verified sender
                subject: 'Reminder for payment',
                text: `Hello, Dear Student - ${data.first + " " + data.lastname}, this is a remider for you need to pay your debited amount...`,
                html: `<strong>your due amount was ${data.amount}, you need to pay as sooon as possible... </strong>`,
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                    res.status(200).json({
                        message: "email was successfully sended",
                        error: false,
                        data: `remider successfully send for student - ${data.firstname + " " + data.lastname} on email id was ${data.email}`,
                    })
                })
                .catch((error) => {
                    console.error(error.response.body)
                    res.status(500).json({
                        message: "sending remider failed...",
                        error: true,
                        data: error?.response,
                    })
                })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "sending remider failed...",
                error: true,
                data: error
            })
        }
    }

}