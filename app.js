const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app=new express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
require('dotenv').config();
app.use(express.static('./public'));


const fs = require('fs');

const routerfile=require('./route/basic.js');

app.use('/api',routerfile);




const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})