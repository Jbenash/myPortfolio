import mongoose, { mongo } from "mongoose";

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    tagline: {
        type: String,
        required: true,

    },
    bio: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,

    },
    education:
        [{
            degree: String,
            degree: String,
            institution: String,
            year: String,
            description: String

        }],
    courses: [
        {
            name: String,
            provider: String,
            year: String,
            image: String,
            certificateUrl: String
        }
    ],
    interests: [String],
    resume: {
        type: String,
        default: '/files/resume.pdf'
    }


}, {
    timestamps: true ////updates the createdAt and updatedAt fields
}

)

const About = mongoose.model("About", aboutSchema)

export default About