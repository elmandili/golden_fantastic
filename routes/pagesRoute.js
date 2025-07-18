import express from 'express'
import dotenv from 'dotenv'
import Traveler from '../models/travelerModel.js'
import Supervisor from '../models/supervisorModel.js'
dotenv.config()


const route = express.Router();

route.get('/travels', (req,res)=>{
    fetch(process.env.API_URL + 'api/travel/get').then(resp => resp.json())
    .then(travels => {
        res.render('travels', { travels: Array.isArray(travels) ? travels : [] });
    })
    
})

route.get('/travelers/:travel_id', async(req,res)=>{
    const travel_id = req.params.travel_id;
    const travelers = await Traveler.find({travel_id: travel_id});
    res.render('travelers', {travelers: travelers, travel_id: travel_id, preview: false});
})

route.get('/travelers', async(req,res)=>{
    const travelers = await Traveler.find();
    res.render('travelers', {travelers: travelers, travel_id: "all", preview: true});
})

route.get('/supervisors', async(req,res)=>{
    const supervisors = await Supervisor.find();
    res.render('supervisors', {supervisors: supervisors});
})



export default route;
