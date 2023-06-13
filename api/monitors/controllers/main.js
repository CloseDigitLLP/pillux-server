module.exports={
    list:async(req,res)=>{
        try {
            let instructors= await framework.services.monitors.basic.fetch();
            if(!instructors.length){
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            }else{
                let data=instructors;
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
    create: async (req, res) => {
        try {
            let instructorData = req.body;
            console.log(req.body);
            let newInstructor = await framework.services.monitors.basic.create(instructorData)
            if (!newInstructor) {
                res.status(200).json({
                    message: "",
                    error: false,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: newInstructor
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
}