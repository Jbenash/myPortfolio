import Skills from '../model/Skills.js';


export const getSkills = async (req, res) => {

    try {
        const skills = await Skills.find().sort({ order: 1, name: 1 })

        // Group skills by category
        const groupSkill = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = []
            }

            acc[skill.category].push(skill)
            return acc
        }, {})

        res.json({
            success: true,
            data: skills,
            grouped: groupSkill,
            count: skills.length

        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Error fetching skills"

        })
    }

}

