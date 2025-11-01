import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'database', 'tools', 'soft-skills'],
        default: 'frontend'
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    icon: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
}
)


const Skills = mongoose.model("skills", skillsSchema)

export default Skills