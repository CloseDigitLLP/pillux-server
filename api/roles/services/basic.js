module.exports = {
  fetch: async () => {
    try {
      return await framework.models.roles.findAll({
        attributes: ['id', 'name']
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
