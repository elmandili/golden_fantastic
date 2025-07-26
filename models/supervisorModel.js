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
    passport_number: {
        type: String,
        required: true
    },
    moroccan_tel: {
        type: String,
        required: true
    },
    saudi_tel: {
        type: String,
        required: true
    },
    image: {
        type:String, 
        required: true,
        default: "https://res.cloudinary.com/di7s8y6pm/image/upload/v1752938562/samples/people/profile_butbzc.png"
    }
})

export default mongoose.model("supvervisors", supervisorSchema);

