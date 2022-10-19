const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, '../database/productsBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: function (req,res){
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render("index", {ps: products})
    }
}

module.exports = mainController;