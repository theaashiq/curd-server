const Main = require('../model/mainSchema')

const getMain = async ( req, res ) => {
    try {
        const mainData = await Main.find().limit(5)
        res.status(200).json(mainData)
    } catch (err) {
        res.status(500).json({error: 'Error fetching data', details: err.message})
    }
} 

const fetchMainData = async ( req, res ) => {
    try {
        const dashboardData = {
            customers: await Main.countDocuments(),
            males: await Main.countDocuments({ gender: 'male'}),
            females: await Main.countDocuments({ gender: 'female'}),
            others: await Main.countDocuments({ gender: 'other'}),
            young: await Main.countDocuments({age: {$lte: 18}}),
            adult: await Main.countDocuments({age: {$gte: 19, $lte: 45}}),
            senior: await Main.countDocuments({age: {$gt: 45}}),
        }
        let customersData;
        switch (req.body.sortBy) {
            case 'name' :
                customersData = await Main.find().sort({ firstName: 1 })    
            break
            case 'date' :
                customersData = await Main.find().sort({ createdAt: -1 })
            break
            default:
                customersData = await Main.find();
        }
        res.status(200).json({
            dashboard : dashboardData,
            customers: customersData
        });
    } catch(err) {
        res.status(500).json({
            error:"Error updating document", details: err.message
        })
    }
}

module.exports = { 
    fetchMainData 
}