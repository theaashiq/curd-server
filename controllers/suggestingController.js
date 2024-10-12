const Main = require('../model/mainSchema');

const suggestData = async (req, res) => {
    try {
        const { search } = req.body; 
        const searchRegex = new RegExp(search, 'i');
        const query = {
            $or: [
                { firstName: { $regex: searchRegex } },
                { lastName: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { phoneNumber: !isNaN(search) ? parseInt(search, 10) : null}
            ]
        }
        const suggestData = await Main.find(query).select('firstName lastName email')
        res.status(200).json(suggestData);
    } catch (err) {
        res.status(500).json({
            error: 'Error suggesting data',
            details: err.message
        });
    }
};

module.exports = { suggestData };
