const router = require('express').Router()
const brandController = require('../controllers/brand.controller')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/brand')
    .get(brandController.getBrands)
    .post(auth, authAdmin, brandController.createBrand)

router.route('/brand/:id')
    .delete(auth, authAdmin, brandController.deleteBrand)
    .put(auth, authAdmin, brandController.updateBrand)

module.exports = router