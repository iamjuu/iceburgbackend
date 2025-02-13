const mongoose = require('mongoose')

const DataBaseConnection =async ()=>{
    try {
        const Connnetion = 'mongodb://127.0.0.1:27017/iceBurg'
        await mongoose.connect(Connnetion, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('dataBase connected');
        
    } catch (error) {
        console.log(error ,'eror in database connect');
    }
  
}

module.exports= DataBaseConnection;