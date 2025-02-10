const express = require('express')
const Router = express.Router()
const Product = require('../Controller/adminController')
const upload = require('../utils/multer')

Router.post('/add-product',upload.single('image'),Product.Productadd)
Router.delete('delete-Product',Product.productDelete)
Router.put('/edit-Product',Product.productEdit)
Router.get('/products',Product.productGet)

module.exports = Router