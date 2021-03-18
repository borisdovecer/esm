const ObjectId = require('mongodb').ObjectId
const slug = require('slug')
const prodModel = require("../models/productModel")
const path = require('path');


exports.get_products = async (req, res) => {
    let find = { lang: "en" }
    if(req.query.ln){
        res.setLocale(req.query.ln)
        find = { lang: "en"}
    }
    try {
        let production = await prodModel.find(find, data => data)
        res.render('products', {
            title: 'Metal parts and components production :: European Strut & Support Manufacturer',
            description: 'Our company manufactures support systems, instruments supports, modules & framing, metal stairways & platforms and offers surface treatment as well.',
            data: production
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_product_details = async (req, res) => {
    const slug = req.params.slug
    let find = { slug: slug }
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    try {
        let production = await prodModel.find(find, data => data)
        res.render('product_details', {
            title: 'Metal parts and components manufacturer :: European Strut & Support Manufacturer',
            description: 'ESM offers serial production of metal parts and components. Competitive prices while maintaining high standards of European quality.',
            data: production
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_product_list = async (req, res) => {
    let find = {}
    let current = 1
    let skip = 0
    let limit = 10
    let sort = { _id: -1 }

    if(req.query.page){
        current = req.query.page
        skip = limit * (current - 1)
    }

    try {
        let count = await prodModel.find(find, data => data)
        let production = await prodModel.find(find, data => data).limit(limit).skip(skip).sort( sort )
        let pages = parseInt(( count.length / limit ) + 0.9)

        res.render('backend/product_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'production',
            user: req.user,
            current: parseInt(current),
            pages:pages,
            data: production
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_create_product = (req, res) => {
    res.render('backend/product_create', {
        title: 'Company news :: European Strut & Support Manufacturer',
        description: 'production',
        user: req.user
    })
}

exports.post_create_product = (req, res) => {
    const { title,  content_text, lang } = req.body
    let img = ""
    if(req.files.img){
        let file = req.files.img
        img = file.name
        file.mv(path.join(__dirname, '../public/image/products', file.name))
    }

    const product = new prodModel({
        title,
        content_text,
        lang,
        image: img,
        slug:slug(title, {lower: true}),

    })
    product.save()
    res.status(201).redirect('/admin/products');

}

exports.get_product_update = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let find = { _id: id }
    try {
        let product = await prodModel.find(find, data => data)
        res.render('backend/product_update', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'production',
            data: product,
            user: req.user
        })
    } catch (err){
        res.status(500).send(err)
    }
}


exports.post_update_product = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let { title, content_text, lang, image } = req.body

    if(req.files){
        let file = req.files.img
        image = file.name
        file.mv(path.join(__dirname, '../public/image/products', file.name))
    }

    let find = { _id: id }
    const set = {
        title,
        content_text,
        image,
        lang
    }
    const opet = await prodModel.updateOne(find,  set, { upsert: true }  , data =>data)
    try {
        res.status(201).redirect('/admin/products');
    } catch (err){
        res.status(500).send(err)
    }
}

exports.post_delete_product = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const product = prodModel.deleteOne(find,data => data)
    try {
        res.status(201).redirect('/admin/products');
    } catch (err){
        res.status(500).send(err)
    }
}
