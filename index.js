
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const http=require("https");
const { METHODS } = require("http");

const app=express();

app.use(express.static("static"));// to get local file to static web page 
app.use(bodyParser.urlencoded({extended:true})); //to get data back from data


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{

    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    // console.log(firstName ,lastName ,email) ;


    const data = { 
      members: [{
          email_address:email,
          status:"subscribed",
          merge_fields:{
              FNAME:firstName,
              LNAME:lastName
          }
      } ]
    };
    const jsonData =JSON.stringify(data);

     const url =  'https://us9.api.mailchimp.com/3.0/lists/b70343fd0e'
     const option= {method:"post",
                auth:"hello:839d6891864562daba67adcab59af0b3-us9" }

   const request= http.request(url,option,function(response){
      
    // console.log(response.statusCode);
    if(response.statusCode===200)
    {  res.sendFile(__dirname+"/sucess.html")}
    else 
    {  res.sendFile(__dirname+"/failure.html")}
   response.on("data",function (data)
   {console.log(JSON.parse(data));}
   )
    })


request.write(jsonData);
request.end();
})

app.post("/failure",(req,res)=>
{
    res.redirect("/");
}) ;


app.listen(process.env.PORT || 3000,()=>{
    console.log("server is active at port 3000"
    )
});

