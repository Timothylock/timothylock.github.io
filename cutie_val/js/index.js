/*
 * @Author: your name
 * @Date: 2021-03-25 09:07:37
 * @LastEditTime: 2021-03-25 09:12:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiny-heart-master\birthday-mobile\js\index.js
 */
$("#login-button").click(function (event) {
  var pwd = document.getElementById("pwd").value;
  //修改密码请改此处
  if ( pwd == "iluuuvyou") {
    event.preventDefault();
    $("form").fadeOut(500);
    $(".wrapper").addClass("form-success");
    setTimeout(function () {
      location.href = "Memories.html";
    }, 2000);
  } else if (pwd == "iluvyou") {
    alert("Like I said, password isn't iluvyou.... its iluuuvyou");
  } else {
    alert("Wrong Password");
  }
});
