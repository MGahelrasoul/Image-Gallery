var express     = require("express"),
    router      = express.Router(),
    Image       = require("../models/images")

router.get("/", (req, res) => {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from db
        Image.find({category: regex}, (err, foundImages) => {
            if(err || !foundImages) {
                console.log(err)
                return res.redirect("back")
            } else if (foundImages.length < 1) {
                console.log("No Images Found")
                return res.redirect("back");
            } else {
                res.render("index", {images: foundImages})
            }
        })
    }
    else {
        Image.find({}, (err, foundImages) => {
            if(err) {
                console.log(err)
            } else {
                res.render("index", {images: foundImages})
            }
        })
    }
})

// Search security/cleaning
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router