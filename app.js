import express from 'express'
import ejs from 'ejs'
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import travelRoute from './routes/travelRoute.js'
import travelerRoute from './routes/travelerRoute.js'
import supervisorRoute from './routes/supervisorRoute.js'
import pagesRoute from './routes/pagesRoute.js'
import hotelRoute from './routes/hotelRoute.js'
import Traveler from './models/travelerModel.js'
import session from 'express-session'
import passport from 'passport'
import authRoutes from './routes/auth.js'
import flash from 'connect-flash'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(helmet());        // Sets secure HTTP headers
app.use(compression());  // Compress response bodies

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))

dotenv.config();
const port = process.env.PORT || 3000

console.log(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req,res,next) => {
	res.locals.error = req.flash('error');
	next();
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

app.get('/',ensureAuthenticated, (req, res) => {
	res.render('index', {user: req.user});
})

app.use('/api/travel/', travelRoute);
app.use('/api/traveler/', travelerRoute)
app.use('/api/supervisor/', supervisorRoute);
app.use('/api/hotel/', hotelRoute);
app.use('/', pagesRoute);



app.listen(port, () => {
	console.log(`server listening to port ${port}`);
});

mongoose.connect(process.env.MONGODB_URL).then(async () => {
	console.log("mongodb connected");
	
}).catch(() => {
	console.log("couldn't connect to mongodb!");
})



app.use('/', authRoutes);
