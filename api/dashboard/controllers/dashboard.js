module.exports={
    getAllUsers:(req,res)=>{
        let users=framework.models.users.findAll({});
        res.json(users);
    }
}