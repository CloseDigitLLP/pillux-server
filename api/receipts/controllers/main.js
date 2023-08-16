const moment = require("moment/moment");

module.exports = {
    list: async (req, res) => {
        try {
            let receipts = await framework.services.receipts.basic.fetch(req?.user);
            if (!receipts.length) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
                const Data = receipts?.flatMap((receipt) => {
                    return receipt?.studentFormula?.flatMap((formula) => {
                        return formula?.studentFormulaPayment?.map((payment) => ({
                            date: moment(payment?.created_at)?.format('YYYY/MM/DD'),
                            fullname: `${receipt?.firstname} ${receipt?.lastname}`,
                            rules: formula?.formulaId?.name,
                            amount: payment?.amount,
                            mode: payment?.mode,
                            checknumber: payment?.numberbankcheck,
                            id: payment?.id
                        }));
                    });
                });
                res.status(200).json({
                    message: '',
                    error: false,
                    data: Data
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