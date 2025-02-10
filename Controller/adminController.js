const Product = require("../Model/product");

module.exports = {
    Productadd: async (req, res) => {
        try {
            const { name, price } = req.body;
            const img = req.file?.path; // Ensure correct file path handling
    
            if (!name || !price || !img) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            const productData = new Product({ name, price, img });
            await productData.save();
    
            res.status(201).json({ message: "Product added successfully", product: productData });
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    
    productDelete: async (req, res) => {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ message: "Product ID is required" });
            }
    
            const deletedProduct = await Product.findByIdAndDelete(id);
    
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
    
            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    productGet :(req,res)=>{
        try {
            const Data = Product.find()
            res.status(200).json({Data:Data})
        } catch (error) {
            console.log(error,'err in product fatahing');
            
        }
    }
    };
