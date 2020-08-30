exports.uploadProfile = async (req,res,next) =>{
    const file = req.file
    if (!file){
      res.json({message:'Please upload a file'})
  
    }else{
      res.json({
      message:'Your Profile Has Been Uploaded',
      profile_url: `http://localhost:4000/profile/${req.file.filename}`,
      filename:`${req.file.filename}`
    })
  }
}
