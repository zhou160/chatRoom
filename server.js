const webSocket = require('ws');

const server = new webSocket.Server({
    port: 8088,
    host: '10.31.161.144'
});

let users = {};
let count = 0;
let userList = [];


server.on('connection', client => {
    client.id = ++count;
    users[client.id] = client;

    //收到数据的时候触发
    client.on('message', msg => {
        msg = JSON.parse(msg);
        let has = userList.some(item => {
            return item.username == msg.username;
        });
        if (!has) {
            let obj = { "username": msg.username };
            userList.push(obj);
            // console.log(client.id);
            client.name = msg.username;
        }
        broadcast(msg.msg, msg.username);
    });
    client.on('close', () => {
        userList = userList.filter(item => {
            return item.username != client.name;
        });

        msg1 = '我下线啦';
        broadcast(msg1, client.name);
    });
});

function broadcast(msg, username) {
    for (let key in users) {
        // console.log(JSON.stringify(userList));
        let user = JSON.stringify(userList);
        users[key].send(`{"userId":"${username}","msg":"${msg}","users":${user}}`);
    }
}