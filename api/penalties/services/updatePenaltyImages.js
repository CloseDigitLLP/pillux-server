module.exports = {
  addUpdateImages: async (penaltyImage) => {
    return await framework.models.penalty_document.bulkCreate(penaltyImage, {
      updateOnDuplicate: ['type'],
      include: [
        {
          as: 'documentPenalty',
          model: framework.models.document,
          updateOnDuplicate: ['path', 'type'],
        },
      ],
    });
  },
  deleteDocs: async (ids) => {
    return await framework.models.penalty_document.destroy({
      where: {
        id: ids,
      },
    });
  },
};
