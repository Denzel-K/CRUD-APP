const express = require ('express');
const path = require ('path');
const morgan = require ('morgan');
const dotenv = require ('dotenv');
const bodyParser = require ('body-parser');
const methodOverride = require ('method-override')
const authRoutes = require ('./routes/authRoutes');
const connectDB = require ('./database/database');
const ejs = require ('ejs');

const app = express();

//configure environment variables
dotenv.config ({path: 'config.env'});

//Set view engine
app.set ('view engine', 'ejs');
app.set ('views', path.join(__dirname, 'views'));

//Database connection
connectDB ();

//middleware
app.use(morgan("dev"));
app.use(express.static("./public"));
app.use (bodyParser.urlencoded({extended: true}));
app.use(authRoutes);
app.use(methodOverride('_method'));

//start server connection
const port = process.env.PORT || 8080;

app.listen (port, ()=> {
    console.log ('App listening on port 3000');
})