import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({
    supervisor: {
        type: String,
        required: true,
        default: "unkown supervisor"
    },
    dep_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    },
    makkah_hotel: {
        type: String,
        required: true
    },
    madina_hotel: {
        type: String,
        required: true
    }
})

export default mongoose.model("travels", travelSchema);