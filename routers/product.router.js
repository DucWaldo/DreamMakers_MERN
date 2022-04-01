const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.route('/products')
    .get(productController.getProducts)
    .post(productController.createProducts)

router.route('/products/:id')
    .delete(productController.deleteProducts)
    .put(productController.updateProducts)

module.exports = router