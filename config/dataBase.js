const mongoose = require('mongoose')

const DataBaseConnection =async ()=>{
    try {
        const Connnetion = 'mongodb+srv://icebergkrnl:ZMs5V3IlpVe2rI78@cluster0.u5tjh.mongodb.net/iceburg'
        await mongoose.connect(Connnetion, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('dataBase connected');
        
    } catch (error) {
        console.log(error ,'eror in database connect');
    }
  
}

module.exports= DataBaseConnection;