function Validator(selector) {
    const formElement = document.querySelector(selector);
    const inputElementsHasRule = formElement.querySelectorAll('[rule]');
    const inputElements = [...formElement.querySelectorAll('input')];
    let submitCode = "";
    const rules = {};
    const validatorRules = {
        required(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email(value) {
            let isValid =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? undefined : 'Địa chỉ email không hợp lệ!';
            return isValid;
        },
        uniqueEmail(value) {
            const emailList = JSON.parse(localStorage.getItem('user-ttthh-key'))
                ?.map(item => item.email) 
                ?? []; 

            return emailList.includes(value) ? undefined : "Không có email này trong hệ thống, xin kiểm tra lại!";
        }
    }

    function getParentElement(element, selectorParent) {
        element = element.parentElement;
        while (element) {
            if (element.matches(selectorParent))
                return element;
            element = element.parentElement;
        }
    }

    function getMessengerError(elementInput) {
        var messengerError;
        rules[elementInput.name].find(a => {
            messengerError = a(elementInput.value);
            return messengerError;
        });
        return messengerError;
    }

    function handlerValidatorError(parentElementInput, messengerError) {
        parentElementInput.classList.add('invalid');
        parentElementInput.querySelector('.form-messenger')
            .innerHTML = `<span><i class="fas fa-times"></i></span>` 
                + messengerError;
    }

    function handlerValidatorSuccess(parentElementInput) {
        parentElementInput.classList.remove('invalid');
        parentElementInput.querySelector('.form-messenger').innerHTML = '';
    }

    function handlerValidator(inputElement, messengerError) {
        var parentElementInput = getParentElement(inputElement, '.form-group');
        if (messengerError)
            handlerValidatorError(parentElementInput, messengerError);
        else
            handlerValidatorSuccess(parentElementInput);
        return !messengerError;
    }

    if (formElement) {

        inputElementsHasRule.forEach(inputElement => {
            inputElement.getAttribute('rule').split('|').forEach(a => {
                var functionRule;
                if (a.includes(':')) {
                    var array = a.split(':');
                    functionRule = validatorRules[array[0]](Number(array[1]));
                } else
                    functionRule = validatorRules[a];
                if (rules[inputElement.name])
                    rules[inputElement.name].push(functionRule);
                else
                    rules[inputElement.name] = [functionRule];
            })

            inputElement.onblur = () => handlerValidator(inputElement, getMessengerError(inputElement));
    
            inputElement.oninput = () => handlerValidatorSuccess(getParentElement(inputElement, '.form-group'));
        })

        formElement.onsubmit = (e) => {
            e.preventDefault();
            var check = true,
                result;
            inputElementsHasRule.forEach(inputElement => {
                result = handlerValidator(inputElement, getMessengerError(inputElement));

                if (!result)
                    check = false;
            });
            if (check) {
                var dataInput = inputElements.reduce((a, b) => {
                    if (b.type === 'radio' && !b.checked)
                        return a;
                    a[b.name] = b.value;
                    return a;
                }, {});
                let nameEmail = dataInput.email;
                let password = "";
                const emailList = JSON.parse(localStorage.getItem('user-ttthh-key'));
                emailList.forEach((value)=>{
                    if (value.email === nameEmail){
                        password = value.password;
                    }
                })
                Email.sendEmail(nameEmail, "HTTTH Shop, Quên mật khẩu!", 'Mật khẩu đăng nhập của bạn là : ' + password)
                    .then(() => {
                        alert("Mật khẩu đã được gửi tới hộp thư gmail của bạn!");
                        const linkGithub = window.location.href.includes('/WebSite_BanGiay_T3H2') ? '/WebSite_BanGiay_T3H2' : '';
                        window.location = linkGithub + '/Login.html';
                    }
                );
            }
        }
    }
}