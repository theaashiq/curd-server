const Main = require('../model/mainSchema');

const generateReportData = async (req, res) => {
    try {
        const { duration } = req.body; 
        let filter = {}; 
        if (duration === 1) {
            const today = new Date();
            const istOffset = 330; 
            const istDate = new Date(today.getTime() + (istOffset * 60000));
            const todayString = istDate.toISOString().split('T')[0]
            filter = {
                createdAt: {
                    $gte: new Date(`${todayString}T00:00:00.000Z`), 
                    $lt: new Date(`${todayString}T23:59:59.999Z`)                  
                }
            };
        } else if (duration === 2) {
            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
            filter = { createdAt: { $gte: tenDaysAgo } }; 
        } else if (duration === 3) {
            filter = {}; 
        } else {
            return res.status(400).json({
                error: 'Invalid duration value'
            });
        }
        const reportData = await Main.find(filter);
        res.status(200).json(reportData);
    } catch (err) {
        res.status(500).json({
            error: 'Error generating data',
            details: err.message
        });
    }
};

module.exports = { generateReportData };
