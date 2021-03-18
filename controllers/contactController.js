const ObjectId = require('mongodb').ObjectId
const slug = require('slug')
const contactModel = require('../models/contactModel')

exports.get_contact = async (req, res) => {
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    let find = {}
    try {
        let contact = await contactModel.find(find, data => data)
        res.render('contact', {
            title: 'Contact Us :: European Strut & Support Manufacturer',
            description: 'Please feel free to contact us for any of your inquiries and questions.',
            user: req.user,
            data: contact
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_contact_list = async (req, res) => {
    let find = {}
    try {
        let contact = await contactModel.find(find, data => data)
        res.render('backend/contact_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'Contact',
            user: req.user,
            data: contact
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_contact_update = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let find = { _id: id }
    try {
        let contact = await contactModel.find(find, data => data)
        res.render('backend/contact_update', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'News',
            user: req.user,
            data: contact
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_create_contact = (req, res) => {
    res.render('backend/contact_create', {
        title: 'Company news :: European Strut & Support Manufacturer',
        description: 'Contact',
        user: req.user
    })
}

exports.post_create_contact = (req, res) => {
    const { title, name, phone1, phone2, email1, email2 } = req.body

    const contact = new contactModel({
        title: title,
        name: name,
        phone1: phone1,
        phone2: phone2,
        email1: email1,
        email2: email2
    })
    contact.save()
        .then(() => {
            res.status(201).redirect('/admin/contact');
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

exports.post_update_contact = async (req, res) => {
    const id = new ObjectId(req.params.id)
    const { title, name, phone1, phone2, email1, email2 } = req.body
    let find = { _id: id }
    const set = {
        title: title,
        name: name,
        phone1: phone1,
        phone2: phone2,
        email1: email1,
        email2: email2
    }

    const opet = await contactModel.updateOne(find,  set, { upsert: true }  , data =>data)

    try {
        res.status(201).redirect('/admin/contact');
    } catch (err){
        res.status(500).send(err)
    }
}
exports.post_delete_contact = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const contact = contactModel.deleteOne(find,data => data)
    try {
        res.status(201).redirect('/admin/contact');
    } catch (err){
        res.status(500).send(err)
    }
}
