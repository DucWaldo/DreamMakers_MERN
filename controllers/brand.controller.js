const Brand = require('../models/brand.model')

const brandController = {
    getBrands: async(req, res) => {
        try {
            const brands = await Brand.find()
            res.json(brands)
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    },
    createBrand: async(req, res) => {
        try {
            const {name} = req.body;
            const brand = await Brand.findOne({name})
            if (brand) {
                return res.status(400).json({
                    msg: "This brand already exists"
                })
            }
            const newBrand = new Brand({name})
            await newBrand.save()
            res.json('Create a Brand')
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    },
    deleteBrand: async(req, res) => {
        try {
            await Brand.findByIdAndDelete(req.params.id)
            res.json({
                msg: "Deleted a Brand"
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    },
    updateBrand: async(req, res) => {
        try {
            const {name} = req.body
            await Brand.findOneAndUpdate({
                id: req.params.id
            }, {
                name
            })
            res.json({
                msg: "Updated a brand"
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
}

module.exports = brandController