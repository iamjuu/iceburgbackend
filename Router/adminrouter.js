const express = require('express')
const Router = express.Router()
const Product = require('../Controller/adminController')
const upload = require('../utils/multer')

Router.post('/addproduct',upload.single('image'),Product.addProduct)
Router.delete('/delete-product/:id',Product.deleteProduct)
// Router.put('/edit-Product',Product.productEdit)
Router.put('/update-product/:id', upload.single('image'),Product.updateProduct);
Router.get('/getproduct',Product.productGet)

module.exports = Router