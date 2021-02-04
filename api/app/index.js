const express = require('express');
const cors = require('cors');
const router = require('./routes/index');


const { PORT }  = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);



app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});

