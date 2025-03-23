import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        // Check if the connection is already established
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to the database.");
            return;
        }
        
        // Attempt to connect to the database
        await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default connectDb;
