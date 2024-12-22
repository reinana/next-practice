import mongoose from "mongoose";

const connectDB = async () => {}
try {
    await mongoose.connect("mongodb+srv://maronana30:eEzeD2LzY9ymkJts@cluster0.srgfu.mongodb.net/nextMarket15Data?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Success: Connected to MongoDB")
    
} catch (error) {
    console.log(`Failure: Unconnected to MangoDB`)
    console.log(error)
    throw new Error()
}

export default connectDB