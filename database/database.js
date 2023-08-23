const mongoose = require ('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect (process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log (`Database Connected: ${connect.connection.host}`);
  }
  catch (err) {
    console.log (err);
   // process.exit (1);
  }
}

module.exports = connectDB;