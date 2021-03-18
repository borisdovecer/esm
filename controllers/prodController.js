const ObjectId = require('mongodb').ObjectId
const slug = require('slug')
const prodModel = require("../models/prodModel")
const path = require('path');

exports.get_prod = async () => {
    try {
        let production = await prodModel.find({}, data => data)
        return prodItems = production
    } catch (err){
        console.log(err)
    }
}

exports.get_production = async (req, res) => {
    let find = { lang: "en" }
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    try {
        let production = await prodModel.find(find, data => data)
        res.render('production', {
            title: 'Metal parts and components production :: European Strut & Support Manufacturer',
            description: 'Our company manufactures support systems, instruments supports, modules & framing, metal stairways & platforms and offers surface treatment as well.',
            data: production
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_production_details = async (req, res) => {
    const slug = req.params.slug
    let find = { slug: slug }
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    try {
        let production = await prodModel.find(find, data => data)
        res.render('production_details', {
            title: 'Metal parts and components manufacturer :: European Strut & Support Manufacturer',
            description: 'ESM offers serial production of metal parts and components. Competitive prices while maintaining high standards of European quality.',
            data: production
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_production_list = async (req, res) => {
    let find = {}
    try {
        let production = await prodModel.find(find, data => data)
        res.render('backend/production_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'production',
            user: req.user,
            data: production
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_create_production = (req, res) => {
    res.render('backend/production_create', {
        title: 'Company news :: European Strut & Support Manufacturer',
        description: 'production',
        user: req.user
    })
}

exports.post_create_production = (req, res) => {
    const { title, short_title, content_text, lang } = req.body
    let img = ""
    let gall = []
    if(req.files.img){
        let file = req.files.img
        img = file.name
        file.mv(path.join(__dirname, '../public/image/production', file.name))
    }
    if(req.files){
        let file = req.files.gallery
        for(i=0; i<file.length; i++){
            gall.push(file[i].name)
            file.mv(path.join(__dirname, '../public/image/production', file.name))
        }
    }

    const production = new prodModel({
        title,
        short_title,
        content_text,
        lang,
        image: img,
        gallery: gall,
        slug:slug(short_title, {lower: true}),

    })
    production.save()
    res.status(201).redirect('/admin/production');
}

exports.get_production_update = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let find = { _id: id }
    try {
        let production = await prodModel.find(find, data => data)
        res.render('backend/production_update', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'production',
            data: production,
            user: req.user
        })
    } catch (err){
        res.status(500).send(err)
    }
}


exports.post_update_production = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let { title, short_title, content_text, lang, image } = req.body
    let find = { _id: id }
    let set = {
        title,
        short_title,
        content_text,
        image,
        lang
    }
    let file = req.files
    let gall = []
    let newImg = false
    let newGall = false

    if(file){
        let im = image
        if (file.img){
            im = file.img.name
            newImg = true
            set = {
                title,
                short_title,
                content_text,
                image: im,
                lang
            }
        }
        if(file.gallery){
            for(i=0; i<file.gallery.length; i++){
                gall.push(file.gallery[i].name)
            }
            newGall = true

            set = {
                title,
                short_title,
                content_text,
                image: im,
                gallery: gall,
                lang
            }
        }
    } else {
        console.log("nemaga")
    }

    if(newImg){
        let file = req.files.img
        file.mv(path.join(__dirname, '../public/image/production', file.name))

    }

    if(newGall){
        let file = req.files.gallery
        for(i=0; i<file.length; i++){
            file.mv(path.join(__dirname, '../public/image/production', file.name))

        }
    }

    const opet = await prodModel.updateOne(find,  set, { upsert: true }  , data =>data)

    try {
        res.status(201).redirect('/admin/production');
    } catch (err){
        res.status(500).send(err)
    }
}

exports.post_delete_production = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const production = prodModel.deleteOne(find,data => data)
    try {
        res.status(201).redirect('/admin/production');
    } catch (err){
        res.status(500).send(err)
    }
}
