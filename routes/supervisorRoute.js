import { create , remove, update} from "../controllers/supervisorController.js";
import express from 'express'
import multer from "multer";

const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

route.post('/create', upload.single('image'), create);
route.delete('/delete/:id', remove);
route.put("/update/:id",upload.single('image'), update);

export default route;