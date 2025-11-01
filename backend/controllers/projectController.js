import Project from "../model/Project.js";

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 })


        res.json({
            success: true,
            count: projects.length,
            data: projects
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error  fetching the projects',
            error: error.message
        })
    }
}

export const getProjectById = async (req, res) => {

    try {
        const project = await Project.findById(req.params.id)
        if (!project) {
            res.status(500).json({
                success: false,
                message: 'No matching data found'
            })
        }

        res.json({
            success: true,
            data: project
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error finding data ",
            error: error.message
        })
    }

}

