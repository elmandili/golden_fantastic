import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({
    supervisor: {
        type: String,
        required: true,
        default: "unkown supervisor"
    },
    departure_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    },
    travelers: {
        type: Array,
        required: true,
        default: []
    }
})

export default mongoose.model("travels", travelSchema);