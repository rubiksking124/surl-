let router = require("express").Router();
let Shorturl1 = require("../models/shorturl.js");
router.post("/new", async (req, res) => {
  try {
    let short = req.body.short;
    let shorturl = req.body.full;
    let info = req.body.info;

    if (info) {
      let test = await Shorturl1.findOne({ short: info });
      if (!test) return res.json({ error: "Short url not found" });
      return res.json({
        full: test.full,
        short: test.short,
        clicks: test.clicks,

        date: test.createdAt.toLocaleDateString()
      });
    }
    var getIP = require("ipware")().get_ip;
    var ipInfo = getIP(req);
    console.log(ipInfo);

    if (!short) {
      if (!shorturl) return res.json({ error: "URL not found" });
      await Shorturl1.create({
        full: shorturl,

        date: test.createdAt.toLocaleDateString()
      });
      let test = await Shorturl1.findOne({ full: shorturl });
      return res.json({ success: true, test: test.short });
      console.log(test.short);
    } else if (short) {
      if (!shorturl) return res.json({ error: "URL not found" });
      await Shorturl1.create({
        full: shorturl,
        short: short,

        date: test.createdAt.toLocaleDateString()
      });
      let test = await Shorturl1.findOne({ full: shorturl });
      return res.json({ success: true, test: test.short });
      console.log(test.short);
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});
module.exports = router;
