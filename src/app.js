const path = require("path");
const hbs=require("hbs");
const express = require("express");
const app = express();

//when we want to deploy website that time we use below port
const port = process.env.PORT || 3000;


const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../template/views");
const partialpath = path.join(__dirname, "../template/partials");

app.use(express.static(staticpath));

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


app.get("/", (req, res) => {
    res.render("index.hbs")
})

app.get("/weather", (req, res) => {
    res.render("weather")
})

app.get("*", (req, res) => {
    res.render("404error",{
        errorMsg:"oops! page not found",
    })
})

app.listen(port, () => {
    console.log("Listeing From port :" + port);
})

