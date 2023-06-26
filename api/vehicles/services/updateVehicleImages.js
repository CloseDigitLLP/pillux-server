module.exports = {
    addUpdateImages: async (vehicleImages) => {
        return await framework.models.vehicle_images.bulkCreate(vehicleImages, {
            updateOnDuplicate: [
                'id', 'vehicle_id'
            ],
        })
    },
    deleteVehicleImaegs: async (ids) => {
        return await framework.models.vehicle_images.destroy({
            where: {
                id: ids,
            },
        });
    }
}