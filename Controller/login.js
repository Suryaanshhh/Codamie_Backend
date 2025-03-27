const jwt=require("jsonwebtoken");

jwt.sign({userName:"Suryansh"},"aabra ka daabra",function(err,token){
    console.log(token)
})



// export const login=async(req,res)=>{
//         const email=req.body.email;
//         const pass=req.body.pass;

//         const existuser=await User.findone({where:{email:email}})

//         if(existuser){
//             bcrpt.compare(pass,existuser.pass,function(err,res){
//                 if(res==true){
    
//                     res.status(200).json({message:"User Logged in successfully"})
//                 }
//             })
//         }
// }