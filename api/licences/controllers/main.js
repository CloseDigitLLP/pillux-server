module.exports = {
    list: async (req,res) => {
        try {
            let licences = await framework.services.licences.basic.fetch();
            if(!licences.length){
                res.status(200).json({
                    message:"No Records Found",
                    error : false , 
                    data : []
                })
            }else{
                res.status(200).json({
                    message: "",
                    error:false,
                    data : licences
                })
            }
        } catch (error) {
            console.log("Error => ", error);
            res.status(500).json({
                messagae: error?.message,
                error: true,
                data: error
            })
        }
    }
}