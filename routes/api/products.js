var express = require('express');
var router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var {Product} = require("../../models/product");

/* GET home page. */
router.get('/', async (req, res) => {
  let products = await Product.find();
  return res.send(products);
});

// let page = Number(req.query.page ? req.query.page: 1);
// let perPage = Number(req.query.perPage ? req.query.perPage: 1);
// let skipRecords = perPage * (page - 1);
// let products = await Product.find().skip(skipRecords).limit(perPage);
// return res.send(products);
router.get('/:id', async (req, res) => {
  try {
  let products = await Product.findById(req.params.id);
  if(!products)
    return res.status(400).send("product with given id not present");
  return res.send(products);
  } catch(err) {
    return res.status(400).send("invalid id");
  }
});

router.put("/:id",validateProduct, async (req, res) => {
  let products = await Product.findById(req.params.id);
  products.name = req.body.name;
  products.price = req.body.price;
  await products.save();
  return res.send(products);
});

router.delete("/:id",async (req, res) => {
  let products = await Product.findByIdAndDelete(req.params.id);
  return res.send(products);
});


router.post("/",validateProduct, async (req, res) => {
  let products = new Product();
  products.name = req.body.name;
  products.price = req.body.price;
  await products.save();
  return res.send(products);
});

module.exports = router;
