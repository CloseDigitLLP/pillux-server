module.exports = {
  addUpdateImages: async (repairDocs) => {
    return await framework.models.repair_document.bulkCreate(repairDocs, {
      updateOnDuplicate: ['instructor_id'],
      include: [
        {
          as: 'documentRepair',
          model: framework.models.document,
          updateOnDuplicate: ['path', 'type'],
        },
      ],
    });
  },
  deleteDocs: async (ids) => {
    return await framework.models.repair_document.destroy({
      where: {
        id: ids,
      },
    });
  },
};
