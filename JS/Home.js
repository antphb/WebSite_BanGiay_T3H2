$(".header__navbar__item--home").addClass("active");

setTimeout(() => {
  $(".app").removeClass("hidden");
  $(".loading").addClass("hidden");
}, 2000);

function kiemTraEmail(input) {
  let strEmail = $(input)[0].value;
  let elemErr =  document.querySelector("#customer-email").parentElement.parentElement.querySelector(".msg-err");

  if (strEmail === '') {
    elemErr.innerHTML = "Vui lòng nhập email";
    return false;
  }

  if (!(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test(strEmail))){
    elemErr.innerHTML = "Không phải là email";
    return false;
  }
  elemErr.innerHTML = "";
  return true;
}

$(".btn__send__email").click(() => {
  let valueEmail = $("#customer-email")[0].value;
  if (kiemTraEmail($("#customer-email")[0])) {
    Email.sendEmail(
      valueEmail.trim(),
      "THHHT Shop Xin Chào Bạn!",
      "Bạn đã kích hoạt thành công nhận thông tin sản phẩm mới nhất từ shop"
    ).then(() => toast({
      title: "Thành công!",
      message: "Gửi thành công.",
      type: "success",
      duration: 5000
    }));
  }
});

$("#customer-email").blur(function(){
  kiemTraEmail(this);
})