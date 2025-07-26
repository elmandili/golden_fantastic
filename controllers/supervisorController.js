import Supervisor from "../models/supervisorModel.js";
import cloudinary from "../public/js/cloudinaryConfig.js";

export const create = async (req, res) => {
    try {
        const { name, n_id, passport_number, moroccan_tel, saudi_tel } = req.body;
        let imageUrl = null;

        const existSupervisor = await Supervisor.find({ n_id: n_id });

        if (!req.body) {
            return res.status(400).json("no body founded");
        }

        console.log(existSupervisor.length)
        if (existSupervisor.length > 0) {
            return res.status(200).json("supervisor already exist");
        }



        if (req.file) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "supervisors" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer);
                })
            }

            try {
                const result = await streamUpload(req.file.buffer);
                imageUrl = result.secure_url;
            } catch (error) {
                return res.status(400).json("internal server error");
            }

        }

        const newSupervisor = new Supervisor({
            name: name,
            n_id: n_id,
            passport_number,
            moroccan_tel,
            saudi_tel,
            image: imageUrl? imageUrl: "https://res.cloudinary.com/di7s8y6pm/image/upload/v1752938562/samples/people/profile_butbzc.png"
        })

        await newSupervisor.save();
        return res.status(200).json("supvervisor created ");


    } catch (error) {
        res.status(400).json("internal server error");
    }
}


export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await Supervisor.findByIdAndDelete(id).then(() => {
            res.status(200).json("supervisor removed successfully! ");
        })

    } catch (error) {
        res.status(400).json("internal server error" + error);
    }
}


export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const n_id = req.body.n_id;
        const {passport_number, moroccan_tel, saudi_tel} = req.body
        let imageUrl = null;

        let updateData = {
            n_id: req.body.n_id,
            name: req.body.name,
            passport_number: passport_number,
            moroccan_tel: moroccan_tel,
            saudi_tel: saudi_tel
        };

        if (req.file) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "supervisors" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer);
                })
            };

            try {
                const result = await streamUpload(req.file.buffer);
                updateData.image = result.secure_url;
                console.log(updateData.image);
            } catch (error) {
                return res.status(400).json({
                    message: "Cloudinary upload error",
                    error: error && error.message ? error.message : JSON.stringify(error)
                });
            }


            

        }

        await Supervisor.findByIdAndUpdate(id, updateData);
        res.status(200).json("supervisor updated");
    } catch (error) {
        res.status(400).json("internal server error : " + error);
    }
}