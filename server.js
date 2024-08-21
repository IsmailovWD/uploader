const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// CORS ni o'rnatish
app.use(cors());

// Multer sozlamalari
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    req.body.name = Date.now() +'-'+ file.originalname
    cb(null, Date.now() +'-'+ file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

// Fayl yuklash marshruti
app.post('/upload', upload, (req, res) => {
  res.send({
    success: true,
    name: req.body.name
  });
});
app.use('/open', express.static('uploads'))

app.get('/', (req,res) => {
  res.send('Uploader is working')
})

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`Server http://localhost:${port} da ishga tushdi`);
});
