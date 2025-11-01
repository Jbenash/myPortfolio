import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [{
        type: String,
        required: true
    }],
    githubLink: {
        type: String,
        trim: true
    },
    demoLink: {
        type: String,
        trim: true
    },
    screenshot: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Project = mongoose.model("Project", projectSchema)

export default Project 
