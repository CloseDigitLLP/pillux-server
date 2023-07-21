
module.exports = {
  fetch: async (id, where = {}, user) => {
    try {
      if (user?.usersRole?.name == 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      if (id) {
        where.id = id;
      }
      return await framework.models.penalties.findAll({
        include: [
          {
            model: framework.models.penalty_document,
            as: 'penaltyDocs',
            require: false,
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
              {
                model: framework.models.document,
                as: 'documentPenalty',
                require: false,
                attributes: { exclude: ['created_at', 'updated_at'] },
              },
            ],
          },
        ],
        where,
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  create: async (data) => {
    try {
      const penalty = await framework.models.penalties.create(data);
      return penalty;
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  update: async (id, data) => {
    try {
      return await framework.models.penalties.update(data, { where: { id } });
    } catch (error) {
      console.log('error=>', error);
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      return await framework.models.penalties.destroy({ where: { id } });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
