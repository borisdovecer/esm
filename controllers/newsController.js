const ObjectId = require('mongodb').ObjectId
const slug = require('slug')
const moment = require('moment')
const NewsModel = require('../models/newsModel')
const path = require('path');

exports.get_news_list = async (req, res) => {
    let find = {}
    let current = 1
    let skip = 0
    let limit = 9
    let sort = { createdOn: -1 }

    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    if(req.query.page){
        current = req.query.page
        skip = limit * (current - 1)
    }
    try {
        let count = await NewsModel.find(find, data => data)
        let news = await NewsModel.find(find, data => data).limit(limit).skip(skip).sort( sort )
        let pages = parseInt(( count.length / limit ) + 0.9)

        res.render('newslist', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'News',
            moment: moment,
            data: news,
            pages: pages,
            current: parseInt(current)
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_news_details = async (req, res) => {
    const slug = req.params.slug
    let find = { slug: slug }
    if(req.query.ln){
        res.setLocale(req.query.ln)
    }
    try {
        let news = await NewsModel.find(find, data => data)
        res.render('newsdetails', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'News',
            moment: moment,
            data: news
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_news_list_admin = async (req, res) => {
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
        let count = await NewsModel.find(find, data => data)
        let news = await NewsModel.find(find, data => data).limit(limit).skip(skip).sort( sort )

        let pages = parseInt(( count.length / limit ) + 0.9)

        res.render('backend/news_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'News',
            moment: moment,
            data: news,
            pages: pages,
            user: req.user,
            current: parseInt(current)
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_create_news = (req, res) => {
    res.render('backend/news_create', {
        title: 'Company news :: European Strut & Support Manufacturer',
        description: 'News',
        user: req.user

    })
}

exports.post_create_news = (req, res) => {
    let today = new Date()
    const { title, description, content_text, lang } = req.body
    let image = null
    let video = null
    if(req.files){
        let file = req.files.img
        if(file.mimetype === "video/mp4"){
            video = file.name
        } else {
            image = file.name
        }

        file.mv(path.join(__dirname, '../public/image/news', file.name))
    }

    const news = new NewsModel({
        title,
        description,
        content_text,
        image,
        video,
        lang,
        slug:slug(req.body.title, {lower: true}),
        createdOn: today
    })
    news.save()
    res.status(201).redirect('/admin/news');

}

exports.get_news_update = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let find = { _id: id }
    try {
        let news = await NewsModel.find(find, data => data)
        res.render('backend/news_update', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'News',
            moment: moment,
            user: req.user,
            data: news
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.post_update_news = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let { title, description, content_text, lang, image, video, createdOn } = req.body

    if(req.files){
        let file = req.files.img
        if(file.mimetype === "video/mp4"){
            video = file.name
        } else {
            image = file.name
        }
        file.mv(path.join(__dirname, '../public/image/news', file.name), (err) => {
            if (err)
                return res.status(500).send(err);
        });
    }

    let find = { _id: id }
    const set = {
        title,
        description,
        content_text,
        image,
        video,
        lang,
        slug:slug(title, {lower: true}),
        createdOn
    }

    const opet = await NewsModel.updateOne(find,  set, { upsert: true }  , data =>data)

    try {
        res.status(201).redirect('/admin/news');
    } catch (err){
        res.status(500).send(err)
    }
}
exports.post_delete_news = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const news = NewsModel.deleteOne(find,data => data)
    try {

        res.status(201).redirect('/admin/news');
    } catch (err){
        res.status(500).send(err)
    }
}
