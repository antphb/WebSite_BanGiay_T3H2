const elemSelectSevices = document.querySelector("#id-select-option");
const elemEmail = document.querySelector("#email-address-id");
const elemFileName = document.querySelector("#output-file-path");
const elemFileChose = document.querySelector("#choose-file");
const elemMSG = document.querySelector("#message-input");
const elemSubmit = document.querySelector("#submit-btn_id");

function start(){
    elemEmail.addEventListener("keyup", ()=>{
        validEmail(elemEmail, getParentElem(elemEmail, "form-group"), /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Định dạng gmail không hợp lệ");
    })
    elemFileChose.addEventListener("change", ()=>{
        validFile(elemFileChose, getParentElem(elemFileChose, "form-group"), /([a-zA-Z0-9\s_\\.\-\(\):])+(.doc|.docx|.pdf)$/, "Định dạng file phải là .doc, .docx., .pdf");
    })

    elemSubmit.addEventListener("click", (e)=>{
        e.preventDefault();
        let isValid1 = validEmail(elemEmail, getParentElem(elemEmail, "form-group"), /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Định dạng gmail không hợp lệ");
        let isValid2 = validFile(elemFileChose, getParentElem(elemFileChose, "form-group"), /([a-zA-Z0-9\s_\\.\-\(\):])+(.doc|.docx|.pdf)$/, "Định dạng file phải là .doc, .docx., .pdf");
        if (isValid1 && isValid2){
            let subjectMail = elemSelectSevices.value;
            let emailAddress = elemEmail.value;
            let stringBody = elemMSG.value;
            let file =  $("#choose-file")[0].files[0];
            let reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function () {
                let dataUri = "data:" + file.type + ";base64," + btoa(reader.result);

                let bodyContent = `Sending file: ${file.name} .Message: ${stringBody}`;
                Email.send({
                    SecureToken : "1513ef06-d5e0-4952-81bf-2e2dec982a95",
                    To : emailAddress,
                    From : "hieurio12@gmail.com",
                    Subject : subjectMail,
                    Body : bodyContent,
                    Attachments : [
                       {
                           name : file.name,
                           data : dataUri
                       }]
                }).then(
                  message => toast({
                    title: "Thành công!",
                    message: "Gửi thành công.",
                    type: "success",
                    duration: 5000
                  })
                );
            }
        }
    })
}
function getParentElem(elem, classParrent){
    while (!elem.classList.contains(classParrent)){
        elem = elem.parentElement;
    }
    return elem;
}
function validEmail(elem, elemParrent, regex, notice){
    let msgErr = elemParrent.querySelector(".msg-error");
    if (elem.value == ""){
        msgErr.innerHTML = "Không được để trống!";
        return false;
    }
    let isValid = regex.test(elem.value);
    if (!isValid){
        msgErr.innerHTML = notice;
        return false;
    }
    msgErr.innerHTML = "(*)";
    return true;
}
function validFile(elem, elemParrent, regex, notice){
    let msgErr = elemParrent.querySelector(".msg-error");
    if (elemFileName.value == ""){
        msgErr.innerHTML = "Không được để trống!";
        return false;
    }
    let isValid = regex.test(elemFileName.value);
    if (!isValid){
        msgErr.innerHTML = notice;
        return false;
    }
    msgErr.innerHTML = "(*)";
    return true;
}

start();