function Validator(selector) {
    const formElement = document.querySelector(selector);
    const inputElementsHasRule = formElement.querySelectorAll('[rule]');
    const inputElements = [...formElement.querySelectorAll('input')];
    let emailName = "";
    let submitCode = "";
    const rules = {};
    const validatorRules = {
        required(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email(value) {
            let isValid =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? undefined : 'Vui lòng nhập email';
  
            if (isValid === undefined && (submitCode === "" || emailName !== value)){
                emailName = value;
                submitCode = Math.random().toString(36).substring(2,8);
                Email.send({
                SecureToken : "a510e069-f161-49ca-91db-4b7eae3b692d",
                To : value,
                From : "hieurio12@gmail.com",
                Subject : "THHHT Shop, Xác thực tài khoản!",
                Body : 'Mã xác thực tài khoản của bạn là : ' + submitCode,
                }).then(
                    message => alert("Đã gửi mã xác thực đến gmail của bạn!")
                );
            }
            return isValid;
        },
        min(minLength) {
            return (value) => {
                return value.length >= minLength ? undefined : `Vui lòng nhập hơn ${minLength} ký tự`;
            }
        },
        formatDate(value) {
            if (value.length === 0)
                return undefined;
            return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value) ? undefined : 'Vui lòng nhập theo dạng DD/MM/YYYY';
        },
        uniqueEmail(value) {
            const emailList = JSON.parse(localStorage.getItem('user-ttthh-key'))
                ?.map(item => item.email) 
                ?? []; 

            return emailList.includes(value) ? 'Email đã được sử dụng' : undefined;
        },
        uniqueSubmitCode(value){
            if (value.length !== 6){
                return "Phải đúng 6 kí tự!";
            }
            let isValid = /^[a-zA-Z0-9]{6}$/.test(value);
            if (!isValid){
                return 'Không được có ký tự đặc biệt hay dấu cách';
            }
            if (value !== "" && value === submitCode){
                return undefined;
            }
            return 'Mã xác thực không đúng!';
           
            
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
                console.log(dataInput);
                if (this.onSubmit)
                    this.onSubmit(dataInput);
                else
                    formElement.submit();
            }
        }
    }
}