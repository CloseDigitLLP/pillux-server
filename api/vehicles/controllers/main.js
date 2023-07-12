module.exports = {
    list: async (req, res) => {
        try {
            let vehicles = await framework.services.vehicles.basic.fetch(null, {}, req?.user);
            if (!vehicles) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
                let data = vehicles.map((vehicle) => ({
                    id: vehicle?.id,
                    name: vehicle?.name,
                    immatriculation: vehicle?.immatriculation,
                    instructor: vehicle?.instructorVehicles?.firstname + " " + vehicle?.instructorVehicles?.lastname
                }))
                res.status(200).json({
                    message: '',
                    error: false,
                    data: data
                });
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                messagae: error?.message,
                error: true,
                data: error
            })
        }
    },
    single: async (req, res) => {
        try {
            let { id } = req.params;
            let vehicle = await framework.services.vehicles.basic.fetch(id);
            if (!vehicle) {
                res.status(200).json({
                    message: 'no record found!',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: vehicle[0]
                });
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                messagae: error?.message,
                error: true,
                data: error
            })
        }
    },
    types: async (req, res) => {
        try {
            let vehicleTypes = await framework.services.vehicles.basic.typeList();
            if (!vehicleTypes) {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: []
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: vehicleTypes
                })
            }
        } catch (error) {
            console.log("error is ==>", error);
            res.status(500).json({
                message: error?.message || "Internal Server Error.",
                error: true,
                data: error
            })
        }
    },
    create: async (req, res) => {
        try {
            let { vehicleData } = req.body;
            vehicleData = JSON.parse(vehicleData);
            let vehicleImages = [];
            let newVehicle = await framework.services.vehicles.basic.create(vehicleData);
            if (req.files && req.files.length > 0) {
                req.files.forEach((file) => {
                    vehicleImages.push({
                        vehicle_id: newVehicle.id,
                        path: file.path,
                        type: file.mimetype
                    })
                })
            }
            if (!newVehicle) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                await framework.services.vehicles.updateVehicleImages.addUpdateImages(vehicleImages);
                res.status(200).json({
                    message: '',
                    error: false,
                    data: newVehicle
                })
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                message: error?.message,
                error: true,
                data: error
            })
        }
    },
    update: async (req, res) => {
        try {
            let { id } = req.params;
            let { vehicleData } = req.body;
            vehicleData = JSON.parse(vehicleData);
            let vehicleImages = [];
            let ids = vehicleData?.deletedImages || []; //array of deleted images id
            let vehicle = await framework.services.vehicles.basic.update(id, vehicleData);
            if (req.files && req.files.length > 0) {
                req.files.forEach((file) => {
                    vehicleImages.push({
                        vehicle_id: id,
                        path: file.path,
                        type: file.mimetype
                    })
                })
            }
            if (!vehicle) {
                res.status(400).json({
                    message: 'invalid data or record does not exists',
                    error: true,
                    data: {}
                })
            } else {
                await framework.services.vehicles.updateVehicleImages.deleteVehicleImaegs(ids);
                await framework.services.vehicles.updateVehicleImages.addUpdateImages(vehicleImages);
                res.status(200).json({
                    message: '',
                    error: false,
                    data: vehicle
                })
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                message: error?.message,
                error: true,
                data: error
            })
        }
    },
    delete: async (req, res) => {
        try {
            let { id } = req.params;
            let vehicle = await framework.services.vehicles.basic.delete(id);
            if (!vehicle) {
                res.status(400).json({
                    message: 'invalid data or record does not exists',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: vehicle
                })
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                message: error?.message,
                error: true,
                data: error
            })
        }
    }
}