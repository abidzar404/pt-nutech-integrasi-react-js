const { Product } = require("../models/index");

class Controller {
   //READ
   static async readProducts(req, res) {
      try {
         let products = await Product.findAll({
            order: [["id", "ASC"]],
         });
         res.status(200).json({
            statusCode: 200,
            data: products,
         });
      } catch (err) {
         next(err);
      }
   }

   //CREATE
   static async createProduct(req, res, next) {
      try {
         const { name, picture, buy, sell, stock } = req.body;
         const id = +req.params.productId;
         await Product.create(
            {
               name,
               picture,
               buy,
               sell,
               stock,
            },
            {
               where: { id },
            }
         );
         res.status(201).json({ msg: "Product Created" });
      } catch (err) {
         next(err);
      }
   }

   //UPDATE
   static async updateProduct(req, res, next) {
      try {
         const { name, picture, buy, sell, stock } = req.body;
         const id = +req.params.productId;

         let productLength = await Product.update(
            {
               name,
               picture,
               buy,
               sell,
               stock,
            },
            {
               where: { id },
            }
         );

         if (productLength <= 0) {
            throw { name: "Product Not Found", statusCode: 404 };
         }
         res.status(200).json({ msg: "Product Updated" });
      } catch (err) {
         next(err);
      }
   }

   //DELETE
   static async deleteProduct(req, res) {
      try {
         await Product.destroy({
            where: {
               id: req.params.productId,
            },
         });
         res.status(200).json({ msg: "Product Deleted" });
      } catch (err) {
         console.log(err.message);
      }
   }
}

module.exports = Controller;
