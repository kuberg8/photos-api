const express = require("express");
const cors = require("cors");
const https = require("https");
const qs = require("qs");
const app = express();
const port = process.env.PORT || 8080;

require('dotenv').config()
const apiKey = process.env.API_KEY;

app.get("/files", cors(), (req, res) => {
  try {
    const options = {
      host: "api.imagekit.io",
      path: "/v1/files?" + qs.stringify(req.query),
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    };

    const httpsreq = https.request(options, (response) => {
      let data = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => (data += chunk));
      response.on("end", () => res.send(JSON.parse(data)));
    });

    httpsreq.end();
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
