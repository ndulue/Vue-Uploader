const express = require('express');
const app = express();
const base64 = require('base64-img');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8081;

app.use(cors());
app.use(express.static('./server/public'));
app.use(bodyParser.json({ limit: '50mb' })); 
 
app.post('/upload', (req, res) => {
    const { image } = req.body;
    base64.img(image, './server/public', Date.now(), (err, filepath) => {
        const pathArr = filepath.split('/')
        const fileName = pathArr[pathArr.length - 1];

        res.status(200).json({
            success: true,
            url: `http://127.0.0.1:${port}/${fileName}`
        })
    });
});

app.listen(port, () => {
    console.log(`starting...${port}`);
})