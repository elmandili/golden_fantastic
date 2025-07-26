import mongoose, { mongo } from "mongoose";

const hotelScema = new mongoose.Schema({
    hotel_name: {
        type: String,
        required: true
    },

    hotel_location: {
        type: String,
        required: true
    },
    hotel_tel: {
        type: String,
        required: true
    },
    hotel_city: {
        type: String,
        required: true
    },
    
})

export default mongoose.model("hotels", hotelScema);

