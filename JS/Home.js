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
