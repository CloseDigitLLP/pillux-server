module.exports = {
    list:async (req,res)=>{
        try {
            let debits=await framework.services.debits.basic.fetch();
            if(!debits.length){
                res.status(200).json({
                    message: '',
                    error: false,
                    data: {}
                })
            }else{
                let data=debits;
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
    }
}