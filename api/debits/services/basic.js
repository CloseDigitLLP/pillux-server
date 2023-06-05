module.exports = {
  fetch: async (id, where = {}) => {
    try {
      if (id) {
        where.id = id;
      }
      return await framework.models.debit.findAll({
        include: {
          model: framework.models.students,
          as: 'studentDebit',
          attributes: { exclude: ['student_id'] }, // Exclude the student_id column from the Student model
        },
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
