const moment = require('moment/moment');

module.exports = {
  list: async (req, res) => {
    try {
      const { startDate, endDate } = req?.query;
      let receipts = await framework.services.receipts.basic.fetch(req?.user, startDate, endDate);
      if (!receipts.length) {
        res.status(200).json({
          message: 'no records found!',
          error: false,
          data: [],
        });
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
              id: payment?.id,
              type: formula?.formulaId?.type,
            }));
          });
        });
        res.status(200).json({
          message: '',
          error: false,
          data: Data,
        });
      }
    // } else {
    //     const Data = receipts?.flatMap((receipt) => {
    //       return receipt?.studentFormula?.flatMap((formula) => {
    //         return formula?.studentFormulaPayment?.map((payment) => {
    //           const paymentDate = moment(payment?.created_at);
    //           if (
    //             (!day || paymentDate.date() == day) &&
    //             (!month || paymentDate.month() + 1 == month) &&
    //             (!year || paymentDate.year() == year)
    //           ) {
    //             return {
    //               date: paymentDate.format('YYYY/MM/DD'),
    //               fullname: `${receipt?.firstname} ${receipt?.lastname}`,
    //               rules: formula?.formulaId?.name,
    //               amount: payment?.amount,
    //               mode: payment?.mode,
    //               checknumber: payment?.numberbankcheck,
    //               id: payment?.id,
    //               type: formula?.formulaId?.type,
    //             };
    //           }
    //         });
    //       });
    //     });
  
    //     // Filter out null or undefined entries
    //     const filteredData = Data.filter((item) => item);
  
    //     res.status(200).json({
    //       message: '',
    //       error: false,
    //       data: filteredData,
    //     });
    //   }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        messagae: error?.message,
        error: true,
        data: error,
      });
    }
  },
};
