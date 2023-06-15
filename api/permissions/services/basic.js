module.exports = {
  fetch: async () => {
    try {
      return await framework.models.permission.findAll({
        attributes: ['id', 'type']
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
