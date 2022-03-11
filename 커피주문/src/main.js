import App from "./app.js";
new App(document.querySelector(".App"));

window.onpopstate = function (event) {
  // 사용자가 브라우저 이동 시 발생되는 이벤트
  new App(document.querySelector(".App"));
};
