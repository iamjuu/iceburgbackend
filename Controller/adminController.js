const product = require("../Model/product");
const path = require("path");
const fs = require("fs/promises");
module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, price } = req.body;
      //   console.log(req.file, name, 'sgs');

      if (!req.file) {
        return res.status(400).json({
          message: "Product image is required",
        });
      }
      const imgPath = req.file.filename;
      const productData = new product({
        name,
        price,
        img: imgPath,
      });
      await productData.save();

      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: productData, // Corrected variable name
      });

      console.log("Product saved");
    } catch (error) {
      console.error("Error in addProduct:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Error adding product",
      });
    }
  },

  productGet: async (req, res) => {
    try {
      const Data = await product.find();
      res.status(200).json({ Data: Data });
    } catch (error) {
      console.log(error, "err in product fatahing");
    }
  },
  updateProduct: async (req, res) => {
    try {
      // Get product ID from params
      const productId = req.params.id;
      console.log(productId);
      console.log(req.file, "fds");

      // Check if product exists
      const existingProduct = await product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Prepare update data
      const updateData = {};

      // Validate and add name if provided
      if (req.body.name) {
        updateData.name = req.body.name.trim();
      }

      // Validate and add price if provided
      if (req.body.price) {
        const price = parseFloat(req.body.price);
        if (isNaN(price) || price < 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid price value",
          });
        }
        updateData.price = price;
      }

      // Handle image upload
      if (req.file) {
        try {
          // Delete old image if it exists
          if (existingProduct.img) {
            const oldImagePath = path.join(
              __dirname,
              "..",
              "public",
              existingProduct.img
            );
            // Check if file exists before attempting to delete
            try {
              await fs.access(oldImagePath);
              await fs.unlink(oldImagePath);
            } catch (error) {
              console.log("Old image not found or already deleted:", error);
            }
          }

          // Update with new image path
          // Assuming the image is saved in a directory named 'uploads'
          updateData.img = req.file.filename;
        } catch (error) {
          console.error("Error handling image update:", error);
          return res.status(500).json({
            success: false,
            message: "Error updating product image",
          });
        }
      }

      // Check if there's any data to update
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No update data provided",
        });
      }

      // Update product in database
      const updatedProduct = await product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true }
      );

      // Send success response
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        Data: updatedProduct,
      });
    } catch (error) {
      // Handle mongoose validation errors
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: Object.values(error.errors).map((err) => err.message),
        });
      }

      // Handle cast errors (invalid ID)
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid Product ID",
        });
      }

      // Log error for debugging
      console.error("Error in updateProduct:", error);

      // Send error response
      res.status(500).json({
        success: false,
        message: "Error updating product",
        error: error.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      console.log(productId, "gotted");

      // Find the product first to get the image path
      const productData = await product.findById(productId);

      if (!productData) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      await product.findByIdAndDelete(productId);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting product",
        error: error.message,
      });
    }
  },
};
