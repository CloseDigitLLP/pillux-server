module.exports = {
  list: async (req, res) => {
    try {
      let offers = await framework.services.offers.basic.fetch();
      if (!offers) {
        res.status(200).json({
          message: '',
          error: false,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: offers,
        });
      }
    } catch (error) {
      console.log('Error While Fetching Offers', error);
      res.status(500).json({
        messagae: error?.message,
        error: true,
        data: error,
      });
    }
  },
  create: async (req, res) => {
    try {
      let offersData = req.body;
      let newOffers = await framework.services.offers.basic.create(offersData);
      if (!newOffers) {
        res.status(404).json({
          message: "Can't Be Added",
          error: true,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: newOffers,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        message: error?.message,
        error: true,
        data: error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.params;
      let offers = await framework.services.offers.basic.delete(id);
      if (!offers) {
        res.status(400).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: offers,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        message: error?.message,
        error: true,
        data: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      let { id } = req.params;
      let offersData = req.body;
      // offersData = JSON.parse(offersData);
      let offers = await framework.services.offers.basic.update(id, offersData);
      if (!offers) {
        res.status(400).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: offers,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        message: error?.message,
        error: true,
        data: error,
      });
    }
  },
};
