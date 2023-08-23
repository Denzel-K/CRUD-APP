const User = require ('../models/user');
const axios = require('axios');

//Render homepage
module.exports.home = async (req, res) => {
  try {
    const users = await User.find({});
    res.render ("index", {users});
  }
  catch (err) {
    console.log (err);
  }
 
}

//Render form to create new user
module.exports.add_get = (req, res) => {
  res.render ('add');
}

//Render editing page
// module.exports.update_get = async (req, res) => {
  
//   try {
//     const user = await User.findOne({_id: req.params.id});
//     res.render ('update', { user });
//   }
//   catch (err) {
//     console.log (err);
//   }
// }

module.exports.update_get = (req, res) =>{
  axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
    .then(function(userdata){
        res.render("update", { user : userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}