"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
   }
   Product.init(
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               notEmpty: { msg: "Name is required" },
            },
         },
         picture: DataTypes.STRING,
         buy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: { msg: "Buy Cost is required" },
            },
         },
         sell: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: { msg: "Sell Cost is required" },
            },
         },
         stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: { msg: "Stock is required" },
            },
         },
      },
      {
         sequelize,
         modelName: "Product",
      }
   );
   return Product;
};
