import About from '../model/about.js';


export  const getAbout = async (req, res) => {
    try {
        const about = await About.findOne()
        if (!about) {
            return res.status(404).json({
                sucess: false,
                message: 'About information not found'
            })
        }

        res.json({
            sucess: true,
            data: about
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching about information',
            error: err.message
        })
    }


}
