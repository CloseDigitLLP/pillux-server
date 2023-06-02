module.exports={
    list:async(req,res)=>{
        try {
            let instructors= await framework.services.monitors.basic.fetch();
            if(!instructors.length){
                res.status(404).json({
                    message: 'no records found!',
                    error: true,
                    data: {}
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
    }
}