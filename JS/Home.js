$(".header__navbar__item--home").addClass("active");

setTimeout(() => {
  $(".app").removeClass("hidden");
  $(".loading").addClass("hidden");
}, 2000);

$(".btn__send__email").click(() => {
  let valueEmail = $("#customer-email").val();
  console.log(valueEmail);
  Email.sendEmail(
    valueEmail.trim(),
    "THHHT Shop Xin Chào Bạn!",
    "Bạn đã kích hoạt thành công nhận thông tin sản phẩm mới nhất từ shop"
  ).then((message) => alert("Gửi thành công!"));
});

$("#customer-email").blur(function(){
    let strEmail = $(this).val();
    let elemErr =  document.querySelector("#customer-email").parentElement.parentElement.querySelector(".msg-err");
  
    if (strEmail != "" && !(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test(strEmail))){
        elemErr.innerHTML = "Không phải là email";
        return false;
    }
    elemErr.innerHTML = "";
    return true;
})