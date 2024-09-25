const Main = require('../model/mainSchema')

const getMain = async ( req, res ) => {
    try {
        const mainData = await Main.find().limit(5)
        res.status(200).json(mainData)
    } catch (err) {
        res.status(500).json({error: 'Error fetching data', details: err.message})
    }
    // res.json({name: 'Mohammed Aashiq'})
} 

const createMain = async ( req, res ) => {
    try {
        const mainData = await Main.create({
            name: req.body.name,
            email: req.body.email
        })
        res.status(200).json(mainData)
    } catch (err) {
        res.status(500).json({error: 'Error fetching data', details: err.message})
    }
}

const updateMain = async ( req, res ) => {
    try {
        const mainData = await Main.findByIdAndUpdate(
            req.body.id,
            {
                name: req.body.name,
                email: req.body.email
            }
        )
        if(!mainData) {
            return res.status(404).json({error: 'Document not found'})
        }
        res.status(200).json({message: 'Updated Sucessfully'})
    } catch(err) {
        res.status(500).json({error: 'Error updating document', details: err.message })
    }
}

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
    deleteMain 
}