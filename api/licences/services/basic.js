module.exports = {
    fetch : async()=>{
        try {
            return await framework.models.licences.findAll({
                attributes: ['id', 'name']
            });
        } catch (error) {
            console.log("Error => ",error);
            return Promise.reject(error);
        }
    }
}