let express = require("express");
let app = express();

app.set("view engine", "ejs");
let Shorturl1 = require("./models/shorturl.js");
let mongoose = require("mongoose");
mongoose.connect(
  "mongo db url",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => console.log("Connected to db")
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let authRoute = require("./auth/auth.js");
app.use("/api", authRoute);

app.get("/", async (req, res) => {
  let shorturls = await Shorturl1.find();
  res.render("index", { shorturls: shorturls });
});
app.get("/data", async (req, res) => {
  let shorturls = await Shorturl1.find();
  res.render("data", { shorturls: shorturls });
});

app.get("/home", async function(req, res) {
  res.render("index");
});
app.get("/docs", async function(req, res) {
  res.render("docs");
});
app.post("/", async (req, res) => {
  let shorturl = req.body.url;
  var getIP = require("ipware")().get_ip;
  var ipInfo = getIP(req);
  console.log(ipInfo);
  await Shorturl1.create({
    full: shorturl,
  
  });

  res.redirect("/data");
});
app.post("/home", async (req, res) => {
  let shorturl = req.body.url;
  var getIP = require("ipware")().get_ip;
  var ipInfo = getIP(req);
  console.log(ipInfo);
  await Shorturl1.create({
    full: shorturl,
   
  });

  res.redirect("/data");
});
app.get("/:shortUrl", async (req, res) => {
  let shorturl = await Shorturl1.findOne({ short: req.params.shortUrl });
  if (shorturl == null) {
    return res.render("404");
  }

  shorturl.clicks++;

  shorturl.save();
  res.redirect(shorturl.full);
});
app.get("/:shortUrl/datas", async (req, res) => {
  let shorturl = await Shorturl1.findOne({ short: req.params.shortUrl });
  if (shorturl == null) {
    return res.render("404");
  }

  res.render("datas", { shorturl: shorturl });
});

app.get("*", function(req, res) {
  res.render("404");
});

app.listen(process.env.PORT, () => console.log("Server started"));
