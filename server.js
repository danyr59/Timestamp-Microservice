/** 
  * @author Daniel Rangel 
  * 
*/

//init project
require('dotenv').config();
const express = require('express');
const app = express();

//enable cors(permite solicitar  recursos restringidos en una pagina web) , solicitudes ajax
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

//archivos estaticos
app.use(express.static('public'));

//routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

//API endpoint
app.get("/api", (req, res) => {
  let date = new Date();
  res.json({ unix: date.valueof(), utc: date.toUTCString() })
})

app.get("/api/:dateTime", (req, res) => {
  const { dateTime: dateTimeString } = req.params;
  if (/\d{5,}/.test(dateTimeString)) {
    let dateTime = parseInt(dateTimeString);
    res.json({
      unix: dateTime,
      utc: new Date(dateTime).toUTCString()
    })
  } else {
    let date = new Date(dateTimeString)

    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" })
    }
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    });
  }
})
// app.get("/", (req, res) => {
//   res.json("Welcome to my climate change News API")
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server runnig on PORT ${port}`));

