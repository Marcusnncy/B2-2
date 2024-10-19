const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

// API to get provinces
app.get('/api/provinces', (req, res) => {
  fs.readFile('vehicle_plates.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data.');
    } else {
      const plates = JSON.parse(data);
      const provinces = Object.keys(plates);
      res.json(provinces);
    }
  });
});

// API to get plate number by province
app.get('/api/plate/:province', (req, res) => {
  const province = req.params.province;
  fs.readFile('vehicle_plates.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data.');
    } else {
      const plates = JSON.parse(data);
      const plateNumber = plates[province];
      if (plateNumber) {
        res.json({ plateNumber });
      } else {
        res.status(404).send('Province not found.');
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
