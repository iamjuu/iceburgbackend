const mongoose = require('mongoose');

const DataBaseConnection = async () => {
    try {
       const connectionURL = 'mongodb+srv://icebergkrnl:ZMs5V3IlpVe2rI78@cluster0.u5tjh.mongodb.net/iceburg?retryWrites=true&w=majority'
        // const connectionURL = 'mongodb://12
        // 7.0.0.1:27017/anan'; // Use 127.0.0.1 instead of localhost
      console.log('bd sggf');
      
       const connecting= await mongoose.connect(connectionURL);


        console.log(' MongoDB connected successfully');
    

    } catch (error) {
        console.log(error)
        console.error(' Error connecting to database:', error.message);
        process.exit(1); // Exit the process if unable to connect
    }
};

module.exports = DataBaseConnection;
