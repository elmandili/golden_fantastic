
import Hotel from '../models/hotelModel.js';

export const create = async (req,res)=>{
    try {
        const hotelData = new Hotel(req.body);
        await hotelData.save();
        res.status(200).json({message: "hotel created"});
    } catch (error) {
        res.status(400).json({message: error});
    }
}


export const fetch = async (req,res) => {
    try {
        const hotels = await Hotel.find();
        return res.status(200).json(hotels);
    } catch (error) {
        return res.status(400).json("error: " + error);
    }
}

export const update = async (req,res)=>{
    try {
        const id = req.params.id;
        const existHotel = await Hotel.findOne({_id: id})

        if(!existHotel){
            return res.status(404).json("no hotel found");
        }

        if(!req.body){
            return res.status(400).json("body is empty");
        }

        const updateHotel = await Hotel.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updateHotel);
    } catch (error) {
        res.status(400).json("internal server error: " + error);
    }
}

export const remove = async (req,res) =>{
    try {
        const id = req.params.id;
        const existHotel = await Hotel.findOne({_id: id});
        if(!existHotel){
            return res.status(404).json("no travel found");
        }
        await Hotel.findByIdAndDelete(id);
        res.status(201).json("travel deleted");
        
    } catch (error) {
        res.status(400).json("internal server error: " + error);
    }
}


export const get_all_travels = async() =>{
    
}