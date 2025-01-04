const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
const {cloudinaryConnect } = require("./config/cloudinary");
const {deleteImages} = require("./Controller/deleteCloudImages")
const cors = require("cors")
const router = express.Router()
const app = express();
app.use(express.json());

dotenv.config();

app.use(cors());
app.use(router);
cloudinaryConnect(); 

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.send("Server is running")
}); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

router.post('/api/v1/removeImage', deleteImages);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});
