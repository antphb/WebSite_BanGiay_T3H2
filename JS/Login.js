const loginForm = new Validator("#login");
const msgLogin = document.querySelector("#login .login-msg");
const linkGithub = window.location.href.includes("/WebSite_BanGiay_T3H2")
  ? "/WebSite_BanGiay_T3H2"
  : "";

if (
  !document.referrer.includes("Login") &&
  !document.referrer.includes("Register") &&
  !document.referrer.includes("forgotPassword.html")
) {
  localStorage.setItem("prevHref", document.referrer);
}

loginForm.onSubmit = (data) => {
  const userList = JSON.parse(localStorage.getItem("user-ttthh-key")) ?? [];
  const getUser = userList.find(
    (user) => user.email === data.email && user.password === data.password
  );

  if (getUser) {
    localStorage.setItem("user-ttthh-info", JSON.stringify(getUser));
    var url_string = window.location.href;
    var url = new URL(url_string);
    var href = url.searchParams.get("href");
    if (href) {
      window.location = linkGithub + `/${href}.html`;
    } else {
      const prevHref = localStorage.getItem("prevHref");
      localStorage.removeItem("prevHref");
      if (prevHref) window.location = prevHref;
      else window.location = linkGithub;
    }
  } else {
    msgLogin.classList.add("invalid");
    msgLogin.querySelector(".form-messenger").innerHTML =
      '<span><i class="fas fa-times"></i></span>Email hoặc mật khẩu không đúng.';
  }
};
