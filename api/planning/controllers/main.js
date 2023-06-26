module.exports={
    list: async(req,res)=>{
        try {
            let plannings = await framework.services.planning.basic.fetch();
            if(!plannings){
                res.status(200).json({
                    message:"Data Not Found",
                    error:false,
                    data:{}
                })
            }else{
                res.status(200).json({
                    message:'',
                    error:false,
                    data:plannings
                })
            }
        } catch (error) {
            console.log("Error is => ",error);
            res.status(500).json({
                message:error?.message || error,
                error:true,
                data:{}
            })
        }
    },
    create:async(req,res)=>{
        try {
            let planningData = req.body;
            console.log(planningData);
            let newPlanning = await framework.services.planning.basic.create(planningData);
            if(!newPlanning){
                res.status(400).json({
                    message:"Can't be Added",
                    error:true,
                    data:{}
                })
            }else{
                res.status(201).json({
                    message:'',
                    error:false,
                    data:newPlanning
                })
            }
        } catch (error) {
            console.log("Error is =>",error);
            res.status(500).json({
                message:error?.message || error,
                error:true,
                data:{}
            })
        }
    },
    delete:async(req,res)=>{
        try {
            let {id} = req.params;
            const deletedPlanning =await framework.services.planning.basic.delete(id);
            if(!deletedPlanning){
                res.status(400).json({
                    message:"Invalid Data Or Record Doesn't Exists",
                    error:true,
                    data:{}
                })
            }else{
                res.status(200).json({
                    message:"",
                    error:false,
                    data:deletedPlanning
                })
            }
        } catch (error) {
            console.log("Error is =>",error);
            res.status(500).json({
                message:error?.message || error,
                error:true,
                data:{}
            })
        }
    },
    update:async (req,res)=>{
        try {
            let { id } = req.params;
            let planningData=req.body;
            let updatedData = await framework.services.planning.basic.update(id,planningData);
            if(!updatedData){
                res.status(400).json({
                    message:"Invalid Data Or Record Doesn't Exists",
                    error:true,
                    data:{}
                })
            }else{
                res.status(201).json({
                    message:'',
                    error:false,
                    data:updatedData
                })
            }
        } catch (error) {
            console.log("Error is =>",error);
            res.status(500).json({
                message:error?.message || error,
                error:true,
                data:{}
            })
        }
    }
}