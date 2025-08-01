import express from 'express'
import dotenv from 'dotenv'
import Traveler from '../models/travelerModel.js'
import Supervisor from '../models/supervisorModel.js'
import Travels from '../models/travelModel.js';
import Hotel from '../models/hotelModel.js';
dotenv.config()


const route = express.Router();


route.get('/travels', ensureAuthenticated, async (req,res)=>{
    const supervisors = await Supervisor.find();
    const travels = await Travels.find();
    const hotels = await Hotel.find();
    
    res.render('travels', {travels: travels, supervisors: supervisors, hotels: hotels});
})

route.get('/travelers/:travel_id', ensureAuthenticated, async(req,res)=>{
    const travel_id = req.params.travel_id;
    const travelers = await Traveler.find({travel_id: travel_id});
    const hotels = await Hotel.find();
    const travel = await Travels.findOne({_id: travel_id});
    const supervisor = await Supervisor.findOne({name: travel.supervisor});
    const supervisors = await Supervisor.find();
    res.render('travelers', {travelers: travelers, travel_id: travel_id, preview: false, hotels, travel, supervisor});
})

route.get('/travelers', ensureAuthenticated, async(req,res)=>{
    const travelers = await Traveler.find();
    const travel_id = "all"
    const hotels = await Hotel.find();
    const supervisor = "none"
    
    
    res.render('travelers', {travelers: travelers, travel_id, preview: true, hotels, supervisor});
})

route.get('/supervisors', ensureAuthenticated, async(req,res)=>{
    const supervisors = await Supervisor.find();
    res.render('supervisors', {supervisors: supervisors});
})

route.get('/hotels', ensureAuthenticated, async(req,res)=>{
    const hotels = await Hotel.find();
    res.render('hotels', {hotels: hotels});
})


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

export default route;
