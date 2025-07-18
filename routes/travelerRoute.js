import express from 'express';
import { create, fetch, fetchOfTravel, remove, update } from '../controllers/travelerController.js';
import multer from 'multer';

const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


route.post('/create/:id',upload.single('image'), create);
route.put('/update/:id', upload.single('image'), update);
route.delete('/delete/:id', remove)
route.get('/getall', fetch)
route.get('/gettravelers/:travel_id', fetchOfTravel);

export default route;