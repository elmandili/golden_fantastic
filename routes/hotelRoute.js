import express from 'express'
import { create, remove, update } from '../controllers/hotelController.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const route = express.Router();

route.post('/create',upload.none(), create);
route.put('/update/:id', upload.none(), update);
route.delete("/delete/:id", remove);
export default route;