const ObjectId = require('mongodb').ObjectId
const downloadModel = require("../models/downloadModel")
const moment = require('moment')
const path = require('path');

exports.get_downloads = async (req, res) => {
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    try {
        let dlen = await downloadModel.find({ category: "document", lang: "en" }, data => data)
        let dlrs = await downloadModel.find({ category: "document", lang: "rs" }, data => data)

        res.render('companydownloads', {
            title: 'Company documents :: European Strut & Support Manufacturer',
            description: 'Company documents',
            data: dlen,
            data2: dlrs
        })
    } catch (err){
        res.status(500).send(err)
    }


}

exports.get_certificates = async (req, res) => {
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    try {
        let cert = await downloadModel.find({ category: "certificates" }, data => data)

        res.render('companycertificates', {
            title: 'Company certificates :: European Strut & Support Manufacturer',
            description: 'All certificates are valid for ESM, since certifications are tied to our company registration code.',
            data: cert
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_download_list = async (req, res) => {
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
        let count = await downloadModel.find(find, data => data)
        let dl = await downloadModel.find(find, data => data).limit(limit).skip(skip).sort( sort )
        let pages = parseInt(( count.length / limit ) + 0.9)

        res.render('backend/download_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'image',
            user: req.user,
            moment: moment,
            current: parseInt(current),
            pages:pages,
            data: dl
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_create_download = (req, res) => {
    res.render('backend/download_create', {
        title: 'Company news :: European Strut & Support Manufacturer',
        description: 'production',
        user: req.user
    })
}

exports.post_create_download = (req, res) => {
    const { title,  category, lang } = req.body
    let pdf = ""
    if(req.files.pdf){
        let file = req.files.pdf
        pdf = file.name
        file.mv(path.join(__dirname, '../public/pdf', pdf));
    }

    const dl = new downloadModel({
        title,
        category,
        lang,
        filename: pdf
    })
    dl.save()
        .then(() => {
            res.status(201).redirect('/admin/downloads');
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}


exports.get_download_update = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let find = { _id: id }
    try {
        let dl = await downloadModel.find(find, data => data)
        res.render('backend/download_update', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'production',
            data: dl,
            user: req.user
        })
    } catch (err){
        res.status(500).send(err)
    }
}


exports.post_update_download = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let { title, category, lang, pdf } = req.body

    if(req.files){
        let file = req.files.pdff
        pdf = file.name
        file.mv(path.join(__dirname, '../public/pdf', pdf));

    }

    let find = { _id: id }
    const set = {
        title,
        category,
        filename: pdf,
        lang
    }
    const opet = await downloadModel.updateOne(find,  set, { upsert: true }  , data =>data)
    try {
        res.status(201).redirect('/admin/downloads');
    } catch (err){
        res.status(500).send(err)
    }
}

exports.post_delete_download = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const dl = downloadModel.deleteOne(find,data => data)
    try {
        res.status(201).redirect('/admin/downloads');
    } catch (err){
        res.status(500).send(err)
    }
}
