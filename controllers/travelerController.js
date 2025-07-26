import Traveler from '../models/travelerModel.js'
import cloudinary from '../public/js/cloudinaryConfig.js';



export const create = async (req, res) => {
    try {
        const travel_id = req.params.id;
        const { n_id, name, passport_number, makkah_hotel, madina_hotel } = req.body;

        if (!n_id || !name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check for existing traveler
        const existTraveler = await Traveler.findOne({ n_id, travel_id });
        if (existTraveler) {
            return res.status(400).json({ message: "Traveler already exists!" });
        }

        let imageUrl = null;

        if (req.file) {
            // Wrap upload_stream in a Promise
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'travelers' },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer);
                });
            };

            try {
                const result = await streamUpload(req.file.buffer);
                req.body.image = result.secure_url;
            } catch (error) {
                // Return the actual error message
                return res.status(400).json({ 
                    message: "Cloudinary upload error", 
                    error: error && error.message ? error.message : JSON.stringify(error)
                });
            }
        }
        else {
            req.body.image  = "https://res.cloudinary.com/di7s8y6pm/image/upload/v1752938562/samples/people/profile_butbzc.png"
        }

        const travelerData = new Traveler({...req.body, travel_id});

        await travelerData.save();
        return res.status(200).json({ message: "Traveler created!" });
    } catch (error) {
        return res.status(400).json({ 
            message: "Internal server error", 
            error: error && error.message ? error.message : JSON.stringify(error)
        });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;

        const existTraveler = await Traveler.findOne({ _id: id });
        if (!existTraveler) {
            return res.status(404).json("no Traveler found !");
        }

        if (!req.body.n_id || !req.body.name) {
            return res.status(400).json("Missing required fields");
        }

        let updateData = {
            n_id: req.body.n_id,
            name: req.body.name
        };

        // If a new image is uploaded, upload to Cloudinary and update the image URL
        if (req.file) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'travelers' },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer);
                });
            };

            try {
                const result = await streamUpload(req.file.buffer);
                req.body.image = result.secure_url;
            } catch (error) {
                return res.status(400).json({
                    message: "Cloudinary upload error",
                    error: error && error.message ? error.message : JSON.stringify(error)
                });
            }
        }

        await Traveler.findByIdAndUpdate(id, req.body);
        return res.status(200).json("traveler updated");
    } catch (error) {
        return res.status(400).json("internal server error: " + error);
    }
}


export const remove = async (req, res) => {
    try {
        const id = req.params.id;

        const existTraveler = await Traveler.findOne({ _id: id });
        if (!existTraveler) {
            return res.status(404).json("travleler doens't exist");
        }
        await Traveler.findByIdAndDelete(id);
        return res.status(200).json("traveler deleted");
    } catch (error) {
        return res.status(400).json("internal server error" + error);
    }
}

export const fetch = async (req, res) => {
    try {
        const travelers = await Traveler.find();
        if (!travelers) {
            return res.status(404).json("no traveler found");
        }

        return res.status(200).json(travelers);
    } catch (error) {
        return res.status(400).json("internal server error: " + error);
    }
}

export const fetchOfTravel = async (req, res) => {
    try {
        const travel_id = await req.params.travel_id;
        const travelers = await Traveler.find({ travel_id: travel_id });

        if (travelers.length === 0) {
            return res.status(404).json("no travelers found!");
        }

        return res.status(200).json(travelers);
    }
    catch (error) {
        return res.status(400).json("internal server error: " + error);
    }

}