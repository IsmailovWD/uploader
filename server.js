const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// CORS ni o'rnatish
app.use(cors());

// 50MBgacha bo'lgan JSON va URL encoded ma'lumotlarini qabul qilish
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Multer sozlamalari
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    req.body.name = Date.now() + '-' + file.originalname;
    cb(null, req.body.name);
  }
});

// 50MB gacha fayl hajmini oshirish
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}).single('file');

// Fayl yuklash marshruti
app.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).send({ success: false, message: 'No file uploaded' });
  }

  res.send({
    success: true,
    name: req.body.name
  });
});

app.get('/', (req,res) => {
  res.send('Uploader is working')
})
// Statik fayllarga kirish
app.use('/open', express.static('uploads'));

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`Server http://localhost:${port} da ishga tushdi`);
});
