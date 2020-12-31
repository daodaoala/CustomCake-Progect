const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {Product} = require('../models/Product');
//=================================
//             Product
//=================================
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') //어디에 파일이 저장되는지 
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}_${file.originalname}`)
    }
  })
   
var upload = multer({ storage: storage }).single("file")

router.post('/image',(req,res)=>{
    upload(req,res,err=>{
        //가져온 이미지를 저장을 해주면 된다.
        if(err){
            return req.json({success:false,err})
        }
        return res.json({success:true,filePath:res.req.file.path,filaName:res.req.filename})
    })
   
})

router.post('/', (req, res) => {
    //받아온 정보들을 DB에 넣어준다.
    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    });
})



module.exports = router;
