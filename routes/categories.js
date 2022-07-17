const router = require("express").Router();
const category = require("../models/Category");


router.post("/",async(req,res)=>{
    const newCat =  new category(req.body);
    try {

        const saveCat = await newCat.save();
        res.status(200).json(saveCat);

    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try {

        const cats = await category.find();
        res.status(200).json(cats);

    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router;