require('dotenv').config();
const express = require('express');


const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to my climate change News API")
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server runnig on PORT ${port}`));

