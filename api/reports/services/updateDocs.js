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
  deleteDocs: async (ids) => {
    return await framework.models.report_document.destroy({
      where: {
        id: ids,
      },
    });
  },
};
