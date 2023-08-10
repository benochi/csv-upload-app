const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('csvFile'), (req, res) => {
  const { file } = req;
  const results = [];

  // Read and parse CSV file
  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Save parsed data as JSON to output.json
      const jsonOutput = JSON.stringify(results, null, 2);

      fs.writeFile('output.json', jsonOutput, (error) => {
        if (error) {
          console.error('Error writing JSON file:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.json({ message: 'CSV uploaded and processed successfully' });
        }
      });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
