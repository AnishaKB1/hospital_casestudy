const express= require('express');

const router=express.Router();
router.use(express.json());
const fs = require('fs');

router.use(express.urlencoded({extended:true}));


const hosRoutes = require('./hospital.js') // import hospital route
router.use(hosRoutes) // use hospital route


const dataPath = './Data/hospital.json' // path to our JSON file

// util functions
const saveHospitalData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getHospitalData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

// Read - get all hospital from the json file
hosRoutes.get('/read', (req, res) => {
    const hospital = getHospitalData()
    res.send(hospital)
  })


  //Update data using POST method
  hosRoutes.post('/create', (req, res) => {
 
    var existHospital = getHospitalData();
    const newId =   Math.floor(10 + Math.random() * 90);
 
    existHospital[newId] = req.body;
   
    console.log( existHospital);
    saveHospitalData( existHospital);
    res.send({success: true,    
             msg: 'Hospital added successfully',
             data :req.body});
  
})


// Update - using Put method
hosRoutes.put('/update/:id', (req, res) => {

    var  existHospital = getHospitalData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const hospitalId = req.params['id'];
      existHospital[hospitalId] = req.body;
      saveHospitalData( existHospital);
      res.send({success: true,    
        msg: `Hospital with id ${hospitalId} has been updated`,
        data :req.body});
    })
  });


  // delete - using delete method
hosRoutes.delete('/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existHospital = getHospitalData()
      const hospitalId = req.params['id'];
      delete existHospital[hospitalId]; 
      saveHospitalData(existHospital);
      res.send({success: true,    
        msg: `Hospital with id ${hospitalId} has been Deleted`,
        data :req.body});
    })
      
  })



module.exports=router;