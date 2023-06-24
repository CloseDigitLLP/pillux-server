const moment = require("moment/moment");

module.exports = {
    list: async (req, res) => {
        try {
            let receipts = await framework.services.receipts.basic.fetch();
            if (!receipts.length) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
                let data = [];
                receipts.forEach((receipt) => {
                    receipt?.studentFormula?.forEach((studentFormula) => {
                        data.push({
                            date: moment(studentFormula?.studentFormulaId?.created_at).format("DD/MM/YYYY"),
                            fullname: receipt?.firstname + " " + receipt?.lastname,
                            rules: studentFormula?.formulaId?.name,
                            mode: studentFormula?.studentFormulaId?.mode,
                            amount: studentFormula?.studentFormulaId?.amount,
                            checknumber: studentFormula?.studentFormulaId?.numberbankcheck
                        });
                    });
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
                messagae: error?.message,
                error: true,
                data: error
            })
        }
    }
}