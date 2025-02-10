const mongooese =  require('mongoose')
const Productschema = new mongooese.Schema({
name:{
    type:String,
},
price:{
    type:String
},
img:{
    type:String
}
})

const Product = mongooese.model('product',Productschema)
module.exports = Product