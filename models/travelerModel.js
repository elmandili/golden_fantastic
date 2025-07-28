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
        default: "بدون"
    },
    passport_number: {
        type: String,
        require: true,
        default: "no value"
    },
    makkah_hotel: {
        type: String,
        require: true,
        default: "no value"
    },
    madina_hotel: {
        type: String,
        require: true,
        default: "no value"
    },
    room_type: {
        type: String,
        require: true,
        default: "رباعية"
    },
    image: {
        type: String,
        required: true,
        default: ""
    }
})

export default mongoose.model("travelers", travelerSchema);