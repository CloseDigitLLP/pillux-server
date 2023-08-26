const moment = require('moment/moment');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = {
  fetch: async (id, where = {}, user) => {
    try {
      let lastDate = moment().subtract(1, "months").format('YYYY-MM-DD HH:mm:ss');
      let firstDate = moment().add(1, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss');
      if (user?.usersRole?.name === 'Secrétaires'|| user?.usersRole?.name === 'Gérants') {
        where['$studentGenerals.drivingschool_id$'] = {
          [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }else if(user?.usersRole?.name === 'Moniteurs'){
        where['$studentGenerals.drivingschool_id$'] = {
          [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
        where['instructor_id'] = user?.id
      }

      if (id) {
        where.id = id;
      }
      where.start_horary = {
        [Op.gte]: lastDate,
        [Op.lte]: firstDate,
      };

      where['$instructorGenerals.enabled$'] = true;
      return await framework.models.planning_generals.findAll({
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            require: true,
          },
          {
            model: framework.models.vehicles,
            as: 'planningVehicle',
            require: true,
          },
          {
            model: framework.models.students,
            as: 'studentGenerals',
            attributes: ['id', 'firstname', 'lastname', 'mobile', 'drivingschool_id'],
            include: [
              {
                model: framework.models.driving_schools,
                as: 'drivingSchoolStudents',
                attributes: ['name', 'email', 'status', 'start_date', 'valid_date', 'enabled'],
                include: [
                  {
                    model: framework.models.skills,
                    as: 'drivingSchoolSkills',
                    attributes: { exclude: ['created_at', 'updated_at'] },
                  },
                ],
              },
              {
                model: framework.models.licences,
                as: 'licenceStudents',
                attributes: ['name']
              },
              (user?.usersRole?.name === 'Moniteurs')
              ? {
                  model: framework.models.student_skill,
                  as: 'studentSkills',
                  separate: true,
                  required: false,
                  order: [['id', 'ASC']],
                  include: [
                    {
                      model: framework.models.skills,
                      as: 'skillId',
                      attributes: { exclude: ['created_at', 'updated_at'] },
                    },
                  ],
                }
              : null,
            ].filter(Boolean),
          },
        ],
        where,
      });
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },
  create: async (data) => {
    try {
      return await framework.models.planning_generals.create(data);
    } catch (error) {
      console.log('Error is => ', error);
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      return await framework.models.planning_generals.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('Error is =>', error);
      return Promise.reject(error);
    }
  },
  update: async (id, data) => {
    try {
      return await framework.models.planning_generals.update(data, {
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('Error is =>', error);
      return Promise.reject(error);
    }
  },
};
