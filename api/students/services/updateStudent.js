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
    }
}