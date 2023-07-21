module.exports = {
  addUpdateImages: async (repairDocs) => {
    return await framework.models.report_document.bulkCreate(repairDocs, {
      updateOnDuplicate: ['id', 'report_id'],
      include: [
        {
          as: 'documentReport',
          model: framework.models.document,
          updateOnDuplicate: ['id'],
        },
      ],
    });
  },
};
