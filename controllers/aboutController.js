const ObjectId = require('mongodb').ObjectId
const aboutModel = require("../models/aboutModel")


exports.get_comingsoon = (req, res) => {
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }

    res.render('coming_soon', {
        title: 'Serial production of metal parts and components :: European Strut & Support Manufacturer',
        description: 'ESM is a European manufacturer and fabricator of metal Strut Supports and Fastening products for wholesalers.'
    });
}


exports.get_index = (req, res) => {
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    console.log(prodItems.length)

    res.render('index', {
        title: 'Serial production of metal parts and components :: European Strut & Support Manufacturer',
        description: 'ESM is a European manufacturer and fabricator of metal Strut Supports and Fastening products for wholesalers.'
    });
}

exports.get_hesq = (req, res) => {
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    console.log(prodItems)

    res.render('hesq', {
        title: 'HSEQ :: European Strut & Support Manufacturer',
        description: 'Through the production activity, we continuously take care of health, safety, environment, and quality (HSEQ). We are aware of our responsibility towards everyone involved in the production process and towards the environment whose resources we responsibly use.'
    })
}

exports.get_about = async (req, res) => {
    let find = { lang: "en" }
    if(req.query.ln){
        res.setLocale(req.query.ln)
        find = { lang: "de"}
    }
    try {
        let about = await aboutModel.find(find, data => data)
        res.render('about', {
            title: 'Metal parts and components manufacturer :: European Strut & Support Manufacturer',
            description: 'ESM offers serial production of metal parts and components. Competitive prices while maintaining high standards of European quality.',
            data: about
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_about_list = async (req, res) => {
    let find = {}
    try {
        let about = await aboutModel.find(find, data => data)
        res.render('backend/about_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'About',
            user: req.user,
            data: about
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_create_about = (req, res) => {
    res.render('backend/about_create', {
        title: 'Company news :: European Strut & Support Manufacturer',
        description: 'About',
        user: req.user,
    })
}

exports.post_create_about = (req, res) => {
    const { title, content_text, lang } = req.body

    const about = new aboutModel({
        title: title,
        content_text: content_text,
        lang: lang,
        user: req.user,

    })
    about.save()
        .then(() => {
            res.status(201).redirect('/admin/about');
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

exports.get_about_update = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let find = { _id: id }
    try {
        let about = await aboutModel.find(find, data => data)
        res.render('backend/about_update', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'About',
            user: req.user,
            data: about
        })
    } catch (err){
        res.status(500).send(err)
    }
}


exports.post_update_about = async (req, res) => {
    const id = new ObjectId(req.params.id)
    const { title, content_text, lang } = req.body
    let find = { _id: id }
    const set = {
        title,
        content_text,
        lang
    }

    const opet = await aboutModel.updateOne(find,  set, { upsert: true }  , data =>data)

    try {
        res.status(201).redirect('/admin/about');
    } catch (err){
        res.status(500).send(err)
    }
}

exports.post_delete_about = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const about = aboutModel.deleteOne(find,data => data)
    try {
        res.status(201).redirect('/admin/about');
    } catch (err){
        res.status(500).send(err)
    }
}
