const productModel = require("../model/productmodel");
const { productvalidationscehma, isValidObjectId, productsearchvalidationscehma } = require("../dto/productdto")


const createProduct = async (req, res) => {
    try {
        const product = req.body
        const { error } = productvalidationscehma.validate(product);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const newProduct = await productModel.create(product);
        return res.status(201).send({ status: true, data: newProduct });

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};

const getallProduct = async (req, res) => {
    try {

        const allproduct = await productModel.find({ is_deleted: false });

        if (allproduct.length == 0)
            return res.status(404).send({ status: false, msg: "Product not found" });

        return res.status(200).send({ status: true, data: allproduct });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const data = req.params;

        if (!isValidObjectId(data.id)) return res.status(400).send({ status: false, msg: "Plss pass a valid productid" });

        const singleproduct = await productModel.findOne({ _id: data.id, is_deleted: false });

        if (!singleproduct)
            return res.status(404).send({ status: false, msg: "Blog not found" });

        return res.status(200).send({ status: true, data: singleproduct });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};

const getProductbyField = async (req, res) => {
    try {
        const data = req.query;
        let query = { is_deleted: false };

        const { error } = productsearchvalidationscehma.validate(data);

        if (error) return res.status(400).json({ error: error.details[0].message });

        if (data.price) {
            query.price = { $regex: new RegExp(data.price, 'i') };
        }

        if (data.category) {
            query.category = { $regex: new RegExp(data.category, 'i') };
        }

        const searchproducts = await productModel.find(query);

        if (searchproducts.length == 0) return res.status(404).send({ status: false, msg: "Product not found" });

        return res.status(200).send({ status: true, data: searchproducts });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const data = req.body;
        let productId = req.params

        const { error } = productvalidationscehma.validate(data);

        if (error) return res.status(400).json({ error: error.details[0].message });

        if (!isValidObjectId(productId.id)) return res.status(400).send({ status: false, msg: "Plss pass a valid productid" });

        const productfind = await productModel.findOne({ _id: productId.id, is_deleted: false });

        if (!productfind)
            return res.status(404).send({ status: false, msg: "Product not found" });

        const updateProduct = await productModel.findOneAndUpdate({ _id: productId.id, is_deleted: false }, { $set: data }, { new: true });

        return res.status(200).send({ status: true, data: updateProduct });
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let productId = req.params;

        if (!isValidObjectId(productId.id)) return res.status(400).send({ status: false, msg: "Plss pass a valid productid" });

        const deleteproduct = await productModel.findOne({ _id: productId.id, is_deleted: false })

        if (!deleteproduct)
            return res.status(404).send({ status: false, msg: "No Product exits" })


        const productdelete = await productModel.findOneAndUpdate({ _id: productId.id, is_deleted: false }, { $set: { is_deleted: true } }, { new: true });

        return res.status(200).send({ status: true, data: productdelete })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports = { createProduct, getallProduct, getProduct, getProductbyField, updateProduct, deleteProduct };