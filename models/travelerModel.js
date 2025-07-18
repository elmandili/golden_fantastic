import mongoose from "mongoose";
import { type } from "os";

const travelerSchema = new mongoose.Schema({
    travel_id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    n_id: {
        type: String,
        required: true,
        default: "AA000"
    },
    image: {
        type: String,
        required: false
    }
})

export default mongoose.model("travelers", travelerSchema);