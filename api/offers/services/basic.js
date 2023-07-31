const { Op } = require("sequelize");

module.exports = {
  fetch: async (id, where = {}, user) => {
    try {
      if (id) {
        where.id = id;
      }
      if(user?.usersRole?.name === 'Secrétaires') {
        where.drivingschool_id = {
          [Op.eq]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
        }
      }
      return await framework.models.formula.findAll({
        where,
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  create: async (data) => {
    try {
      return await framework.models.formula.create(data);
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      return await framework.models.formula.destroy({ where: { id } });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  update: async (id, data) => {
    try {
      return await framework.models.formula.update(data, { where: { id } });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
