const product = require("../Model/product");

module.exports = {
    addProduct: async (req, res) => {
      try {
    
        
        const { name, price } = req.body;
                if (!req.file) {
          return res.status(400).json({
            message: "Product image is required"
          });
        }
          const imgPath = '/public/' + req.file.filename;
          const productData = new product({
          name,
          price,
          img: imgPath
        });  
        await productData.save();
        res.status(201).json({
          success: true,
          message: "Product added successfully",
          product
        });
        console.log('product saved');
      } catch (error) {
        console.error('Error in addProduct:', error);
        res.status(500).json({
          success: false,
          message: error.message || "Error adding product"
        });
      }
    },
    
    productDelete: async (req, res) => {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ message: "Product ID is required" });
            }
    
            const deletedProduct = await product.findByIdAndDelete(id);
    
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    
    productEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price } = req.body;
            const img = req.file?.path; // If an image is uploaded
    
            if (!id) {
                return res.status(400).json({ message: "Product ID is required" });
            }
    
            // Create an update object dynamically
            const updateData = {};
            if (name) updateData.name = name;
            if (price) updateData.price = price;
            if (img) updateData.img = img;
    
            const updatedProduct = await product.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    productGet :async(req,res)=>{
        try {
            const Data = await product.find()
            res.status(200).json({Data:Data})
        } catch (error) {
            console.log(error,'err in product fatahing');
            
        }
    }
    }
