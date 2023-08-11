const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/comicsDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("CONNECTION OPEN")
}).catch(err => {
    console.log("Error on connecting mongo")
    console.log(err)
})
