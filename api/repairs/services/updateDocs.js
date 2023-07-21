module.exports = {
  addUpdateImages: async (repairDocs) => {
    return await framework.models.repair_document.bulkCreate(repairDocs, {
      updateOnDuplicate: ['id', 'repair_id'],
      include: [
        {
          as: 'documentRepair',
          model: framework.models.document,
          updateOnDuplicate: ['id'],
        },
      ],
    });
  },
};