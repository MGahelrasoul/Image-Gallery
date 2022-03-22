const express   = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    Image       = require("./models/images"),
    indexRoutes = require('./routes/index')

mongoose.connect("mongodb://localhost/ImageGallery", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("CONNETED TO DB"))
.catch((error) => console.log(error.message))

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use("/", indexRoutes)

app.listen(3000, (err) => {
    console.log("SERVER STARTED")
})