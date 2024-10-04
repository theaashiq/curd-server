const Main = require('../model/mainSchema')

const getMain = async ( req, res ) => {
    try {
        const mainData = await Main.find().limit(5)
        res.status(200).json(mainData)
    } catch (err) {
        res.status(500).json({error: 'Error fetching data', details: err.message})
    }
} 

const createMain = async ( req, res ) => {
    try {
        const uniqueId = Math.floor(100000 + Math.random() * 900000);
        const firstletter = req.body.firstName.split('')[0].toUpperCase()
        const lastletter = req.body.lastName.split('')[0].toUpperCase()
        const mainData = await Main.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            dob: req.body.dob,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            customerId: `${firstletter}${lastletter}${uniqueId}`,
        })
        res.status(200).json(mainData)
    } catch (err) {
        res.status(500).json({error: 'Error fetching data', details: err.message})
    }
}

const updateMain = async (req, res) => {
    const { id, firstName, lastName, email, age, dob, phoneNumber, gender } = req.body;
    const getISTDateTime = () => {
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // Offset for IST (5 hours 30 minutes)
        return new Date(now.getTime() + istOffset);
    }
    const time = getISTDateTime()
    if (!id) {
        return res.status(400).json({ error: 'ID is required for update' });
    }

    try {
        const mainData = await Main.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                age,
                dob,
                phoneNumber,
                gender,
                lastUpdatedAt: time
            },
            { new: true } // Return the updated document
        );

        if (!mainData) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ message: 'Updated successfully', data: mainData });
    } catch (err) {
        res.status(500).json({ error: 'Error updating document', details: err.message });
    }
};

const deleteMain = async ( req, res ) => {
    const { id } = req.body
    try {
        const mainData = await Main.findByIdAndDelete(id)
        if(!mainData) {
            return res.status(404).json({error: 'Document not found'})
        }
        res.status(200).json({message: 'Deleted Sucessfully'})
    } catch(err) {
        res.status(500).json({error: 'Error updating document', details: err.message })
    }
}

module.exports = { 
    getMain,
    createMain,
    updateMain,
    deleteMain,
}