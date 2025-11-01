import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`succesfully connected ${con.connection.host}`);
    } catch (er) {
        console.log(`DB connection failed ${er.message}`);
        process.exit(1);
    }

}

export default connectDB;