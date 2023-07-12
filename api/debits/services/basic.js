
module.exports = {
  fetch: async () => {
    try {
      return await framework.models.students.findAll({
        include: [
          {
            model: framework.models.student_formula,
            as: "studentFormula",
            separate: true,
            order: [['id', 'ASC']],
            include: [
              {
                model: framework.models.formula,
                as: 'formulaId',
              },
              {
                model: framework.models.student_payment,
                as: 'studentFormulaPayment',
                separate: true,
                order: [['id', 'ASC']]
              }
            ]
          }
        ],
        attributes: [
          'id',
          'lastname',
          'firstname',
          'date_code',
          'email'
        ],
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  }
 
};
