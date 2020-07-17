$('#login').click(function() {
    console.log(123);
    let username = $('#username').val();
    location.href = `http://10.31.161.144:6066/chat.html?username=${username}`;
});