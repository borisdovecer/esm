const ObjectId = require('mongodb').ObjectId
const imageModel = require("../models/imageModel")
const moment = require('moment')
const path = require('path');

exports.get_image_list = async (req, res) => {
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
        let count = await imageModel.find(find, data => data)
        let image = await imageModel.find(find, data => data).limit(limit).skip(skip).sort( sort )
        let pages = parseInt(( count.length / limit ) + 0.9)

        res.render('backend/image_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'image',
            user: req.user,
            moment: moment,
            current: parseInt(current),
            pages:pages,
            data: image
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.post_create_image = async (req, res) => {
    let today = new Date()
    let img = []

    if(req.files.img.length > 1){
        let file = req.files.img
        console.log(file)
        for(i=0; i<file.length; i++){
            img.push(file[i].name)
            file[i].mv(path.join(__dirname, '../public/image/upload', file[i].name), (err) => {
                if (err)
                    return res.status(500).send(err);
            });

            const image = new imageModel({
                filename: file[i].name,
                url: "/image/upload/" + file[i].name,
                createdOn: today
            })
            image.save()
                .then(() => {
                    res.status(200);
                })
                .catch((err) => {
                    res.status(500).send(err)
                })
        }

    } else {
        let file = req.files.img
        img = file.name
        file.mv(path.join(__dirname, '../public/image/upload', file.name));

        const image = new imageModel({
            filename: img,
            url: "/image/upload/" + img,
            createdOn: today
        })
        image.save()
            .then(() => {
                res.status(200);
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }
    res.redirect('/admin/images')
}

exports.post_delete_image = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const img = imageModel.deleteOne(find,data => data)
    try {
        res.status(201).redirect('/admin/images');
    } catch (err){
        res.status(500).send(err)
    }
}
