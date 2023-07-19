module.exports = {
    updateFileUploads: async (docsToUpdate) => {
        return framework.models.student_document.bulkCreate(docsToUpdate, {
            updateOnDuplicate: [
                'id'
            ],
            include: [
                {
                    as: 'documentStudent',
                    model: framework.models.document,
                    updateOnDuplicate: [
                        'path',
                        'type'
                    ]
                }
            ]
        })
    },
    updateComment: async (comment) => {
        return await framework.models.comments.create(comment)
    },
    addUpdateSKill: async (skills) => {
        return await framework.models.student_skill.bulkCreate(skills, {
            updateOnDuplicate: ['status'],
        })
    },
    addFormula: async (formula) => {
        return await framework.models.student_formula.create(formula);
    },
    addPayment: async (payment) => {
        return await framework.models.student_payment.create(payment);
    },
    deleteFormula: async (id) => {
        return await framework.models.student_formula.destroy({ where: { id } });
    },
    updateLicencePermit : async (id,data) => {
        return await framework.models.students.update(data[0], { where: { id } });
    }
}