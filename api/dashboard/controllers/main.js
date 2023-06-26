module.exports = {
    getAllUsers: async (req, res) => {
        let users = await framework.models.users.findAll({});
        res.json(users);
    },
    list : async (req,res)=>{
        try {
            let data=await framework.services.dashboard.basic.fetch();
            console.log(data);
            if(!data){
                res.status(404).json({
                    message:'Data Not Found',
                    error:true,
                    data:{}
                })
            }else{
                res.status(200).json({
                    message:'',
                    error:false,
                    data
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
    }
}