const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth')
router.get("/",ensureAuthenticated,(req,res)=>{
   res.status(200).json([
      {name:"mobile",
         price:12333
      },
      {name:"T.V",
         price:23000
      },
   ])
})

module.exports = router