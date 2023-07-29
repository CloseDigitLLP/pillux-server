module.exports = {
  addUpdateImages: async (repairDocs) => {
    return await framework.models.report_document.bulkCreate(repairDocs, {
      updateOnDuplicate: ['type'],
      include: [
        {
          as: 'documentReport',
          model: framework.models.document,
          updateOnDuplicate: ['path', 'type'],
        },
      ],
    });
  },
};
