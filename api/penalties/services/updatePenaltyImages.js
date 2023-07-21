module.exports = {
  addUpdateImages: async (penaltyImage) => {
    return await framework.models.penalty_document.bulkCreate(penaltyImage, {
      updateOnDuplicate: ['id', 'penalty_id'],
      include: [
        {
          as: 'documentPenalty',
          model: framework.models.document,
          updateOnDuplicate: ['id'],
        },
      ],
    });
  },
};
