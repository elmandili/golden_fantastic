import express from 'express'
import ejs from 'ejs'
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import travelRoute from './routes/travelRoute.js'
import travelerRoute from './routes/travelerRoute.js'
import supervisorRoute  from './routes/supervisorRoute.js'
import pagesRoute from './routes/pagesRoute.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))

dotenv.config();
const port = process.env.PORT || 3000

console.log(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{
	res.render('index');
})

app.use('/api/travel/', travelRoute);
app.use('/api/traveler/', travelerRoute)
app.use('/api/supervisor/', supervisorRoute);
app.use('/', pagesRoute);



app.listen(port, ()=>{
	console.log(`server listening to port ${port}`);
});

mongoose.connect(process.env.MONGODB_URL).then(()=>{
	console.log("mongodb connected");
}).catch(()=>{
	console.log("couldn't connect to mongodb!");
})
