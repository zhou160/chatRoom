const express = require('express');
const path = require('path');
const app = express();
let port = 6066;

//这个操作等于是gulp的服务器中的设置服务器打开文件夹的功能
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => {
    console.log(`server is running on http://10.31.161.144:${port}`);
})