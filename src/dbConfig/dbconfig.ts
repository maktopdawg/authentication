import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Database connection successful.')
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong.")
        console.log(error)
    }
}