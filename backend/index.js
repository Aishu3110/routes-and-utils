const express=require('express')
const cors=require('cors')
var bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');
const addincomeRoutes = require('./routes/addincomeRoutes');
const updateincomeRoutes = require('./routes/updateincomeRoutes');
const getincomerateRoutes = require('./routes/getincomerateRoutes');
const getunpaidincomeRoutes = require('./routes/getunpaidincomeRoutes');
const getincomedetailsRoutes = require('./routes/getincomedetailsRoutes');
const getsingleincomedetailsRoutes = require('./routes/getsingleincomedetailsRoutes');
const generatereceiptRoutes = require('./routes/generatereceiptRoutes');
const deletesinglerecordRoutes = require('./routes/deletesinglerecordRoutes');
const addexpenseRoutes = require('./routes/addexpenseRoutes');
const updateexpenseRoutes = require('./routes/updateexpenseRoutes');
const getdirectexpenseRoutes = require('./routes/getdirectexpenseRoutes');
const getindirectexpenseRoutes = require('./routes/getindirectexpenseRoutes');
const getexpensedetailsRoutes = require('./routes/getexpensedetailsRoutes');
const deleteexpenseRoutes = require('./routes/deleteexpenseRoutes');
const getsummaryRoutes = require('./routes/getsummaryRoutes');
const postsummaryRoutes = require('./routes/postsummaryRoutes');
const putsummaryRoutes = require('./routes/putsummaryRoutes');
const deletesummaryRoutes = require('./routes/deletesummaryRoutes');
const apiloginRoutes = require('./routes/apiloginRoutes');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.json()) 


app.use(cors())
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.removeHeader('x-powered-by');
  //set the allowed HTTP methods to be requested
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  //headers clients can use in their requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //allow request to continue and be handled by routes
  next();
});
app.use('/user', userRoutes);
app.use('/otp', otpRoutes);
app.use('/incomeadd',addincomeRoutes);
app.use('/incomeupdate',updateincomeRoutes);
app.use('/getincome',getincomerateRoutes);
app.use('/getunpaidincome',getunpaidincomeRoutes);
app.use('/getdetailedincome',getincomedetailsRoutes);
app.use('/getsingleincome',getsingleincomedetailsRoutes);
app.use('/receiptgenerate',generatereceiptRoutes);
app.use('/singlerecorddel',deletesinglerecordRoutes);
app.use('/addingexpense',addexpenseRoutes);
app.use('/expenseupdate',updateexpenseRoutes);
app.use('/getdirectexpense',getdirectexpenseRoutes);
app.use('/getindirectexpense',getindirectexpenseRoutes);
app.use('/getdetailedexpense',getexpensedetailsRoutes);
app.use('/deletesingleexpense',deleteexpenseRoutes);
app.use('/getsummary',getsummaryRoutes);
app.use('/postsummary',postsummaryRoutes);
app.use('/putsummary',putsummaryRoutes);
app.use('/deletesummary',deletesummaryRoutes);
app.use('/apilogin',apiloginRoutes);


app.listen(8089,()=>{
    console.log("listening backend")
})

