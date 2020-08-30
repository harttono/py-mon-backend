exports.uploadPayment = async (req,res,next) =>{
        const file = req.file
        if (!file){
          res.json({message:'Please upload a file'})
      
        }else{
          res.json({
          message:'Your Payment Has Been Uploaded',
          payment_url: `http://localhost:4000/payment/${req.file.filename}`,
          filename:`${req.file.filename}`
        })
      }
}