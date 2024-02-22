const express = require('express')
const router = express.Router()
const { createProduct, getallProduct, getProduct, getProductbyField, updateProduct, deleteProduct } = require('../controller/productcontroller')


router.get('/test', (req, res) => {
    res.send({ "message": "working fine" });
})


router.post('/api/v1/product', createProduct)

router.get('/api/v1/product', getallProduct)

router.get('/api/v1/product/:id', getProduct)

router.get('/api/v1/productsearch', getProductbyField)

router.put('/api/v1/product/:id', updateProduct)

router.delete('/api/v1/product/:id', deleteProduct)

module.exports = router;