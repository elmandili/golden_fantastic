import express, { Router } from 'express'
import { create, fetch, remove, update } from '../controllers/travelController.js';

const route = express.Router();

route.post('/create', create);
route.get('/get', fetch)
route.put('/update/:id', update);
route.delete('/delete/:id', remove);

export default route;