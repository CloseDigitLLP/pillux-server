module.exports = {
    addUpdateSkills: async (dsSkills) => {
        try {
            return await framework.models.skills.bulkCreate(dsSkills, {});
        } catch (error) {
            console.log("while adding Skills for drivingSchool Error: ==>", error);
            return Promise.reject(error);
        }
    }
}