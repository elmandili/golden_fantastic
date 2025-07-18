import mongoose, { mongo } from "mongoose";

const supervisorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    n_id: {
        type: String,
        required: true
    },

    image: {
        type:String, 
        required: true
    }
})

export default mongoose.model("supvervisors", supervisorSchema);

