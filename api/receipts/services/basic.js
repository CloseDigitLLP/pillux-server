module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.students.findAll({
                include: [ 
                    {
                        model: framework.models.student_formula,
                        as: 'studentFormula',
                        attributes: ['formula_id','quantity','secretary_id'],
                        separate: true,
                        order: [["id", "ASC"]],
                        include: [
                            {
                                model: framework.models.student_payment,
                                as: 'studentFormulaPayment',
                                attributes: ['mode','id','amount','numberbankcheck','created_at','updated_at','secretary_id'],
                                separate: true,
                                order: [['id', 'ASC']]
                            },
                            {
                                model: framework.models.formula,
                                as: 'formulaId',
                                attributes: ['name', 'id', 'price', 'hour']
                            }
                        ]
                    }
                ],
                attributes: ['id', 'firstname', 'lastname'],
                where,
                order: [['id', "DESC"]]
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    }
}