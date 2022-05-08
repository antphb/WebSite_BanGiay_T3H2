const registerForm = new Validator("#register");
const USERS_TTTHH_KEY = "user-ttthh-key";
const userList = JSON.parse(localStorage.getItem(USERS_TTTHH_KEY)) ?? [];
const linkGithub = window.location.href.includes("/WebSite_BanGiay_T3H2")
  ? "/WebSite_BanGiay_T3H2"
  : "";

if (!document.referrer.includes("Register.html")) {
  localStorage.setItem("prevRegister", document.referrer);
}

registerForm.onSubmit = (data) => {
  console.log(data);
  localStorage.setItem(USERS_TTTHH_KEY, JSON.stringify([...userList, data]));
  const prevRegister = localStorage.getItem("prevRegister");
  localStorage.removeItem("prevRegister");
  if (prevRegister) {
    window.location = prevRegister;
  } else window.location = linkGithub + "/Login.html";
};
