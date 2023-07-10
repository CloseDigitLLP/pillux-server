module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.exam_wishlist.findAll({
                include: [
                    {
                        model: framework.models.students,
                        as: 'studentExamWishlist',
                        attributes: ['id', 'firstname', 'lastname', 'email']
                    },
                    {
                        model: framework.models.users,
                        as: 'instructorExamWishlist'
                    }
                ],
                where
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.exam_wishlist.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
}