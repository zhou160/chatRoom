  let url = 'ws://10.31.161.144:8088'; //通信地址 websocket的通信协议是ws

  let ws = new WebSocket(url); //websocket是HTML新增的构造函数
  let arr = location.search.slice(1);
  let obj = {};
  obj[arr.split('=')[0]] = arr.split('=')[1];

  console.log(obj);

  ws.onopen = function() {
      ws.send(`{"username":"${obj.username}","msg":"我来啦"}`);
  };

  ws.onmessage = function(ev) {
      let date = new Date();
      let data = JSON.parse(ev.data);
      let userlist = '';
      for (var i = 0; i < data.users.length; i++) {
          userlist += `
                  <li>${data.users[i].username}</li>
              `
      }
      $('header i').html(`(${data.users.length}人)`)
      $('.userList').html(userlist);
      let str = '';
      str = `
          <p data-id=${data.userId}>
          <i></i>
          <b>${data.userId}&nbsp;&nbsp;&nbsp;&nbsp;${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</b>
          <span>${data.msg}</span>
      </p>
          `
      $('.content').append(str);
      const username = $('.content p').eq(0).attr('data-id');
      if (data.userId == username) {
          $('.content p:last-child').addClass('active');
      }
  }

  $('.send').click(function() {
      ws.send(`{"username":"${obj.username}","msg":"${$('.msg').val()}"}`);
      $('.msg').val('');
  });

  $('.close').click(function() {
      ws.close();
      location.href = 'http://10.31.161.144:6066/index.html'
  });