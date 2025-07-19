import Travel from '../models/travelModel.js'

export const create = async (req,res)=>{
    try {
        if(!req.body){
            console.log(req.body)
            return res.status(400).json("body is empty");
        }

        console.log(req.body);
        const travelData = new Travel(req.body);
        const {supervisor} = travelData;

        const savedTravel = travelData.save();
        res.status(200).json({message: "travel created"});
    } catch (error) {
        res.status(400).json({message: "internal server error"});
    }
}


export const fetch = async (req,res) =>{
    try {
        const travels = await Travel.find();
        if(travels.length === 0){
            return res.json("not travels found");
        }

        return res.status(200).json(travels);
    } catch (error) {
        console.log("internal server error");
    }
}

export const update = async (req,res)=>{
    try {
        const id = req.params.id;
        const existTravel = await Travel.findOne({_id: id})

        if(!existTravel){
            return res.status(404).json("no travel found");
        }

        if(!req.body){
            return res.status(400).json("body is empty");
        }

        const updateTravel = await Travel.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updateTravel);
    } catch (error) {
        res.status(400).json("internal server error: " + error);
    }
}

export const remove = async (req,res) =>{
    try {
        const id = req.params.id;
        const existTravel = await Travel.findOne({_id: id});
        if(!existTravel){
            return res.status(404).json("no travel found");
        }
        await Travel.findByIdAndDelete(id);
        res.status(201).json("travel deleted");
        
    } catch (error) {
        res.status(400).json("internal server error: " + error);
    }
}


export const get_all_travels = async() =>{
    
}