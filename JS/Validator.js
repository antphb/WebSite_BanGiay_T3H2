function Validator(selector) {
    const formElement = document.querySelector(selector);
    const inputElementsHasRule = formElement.querySelectorAll('[rule]');
    const inputElements = [...formElement.querySelectorAll('input')];
    let emailName = "";
    let submitCode = "";
    const rules = {};
    const validatorRules = {
        required(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        },
        email(value) {
          
            let isValid =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim()) ? undefined : 'Địa chỉ email không hợp lệ!';
            
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
            return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value.trim()) ? undefined : 'Vui lòng nhập theo dạng DD/MM/YYYY';
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
        },
        beforeDayNow(value) {
            if (value === '')
                return undefined;
            return new Date(value.split('/').reverse().join('-')) < new Date() ? undefined : 'Ngày sinh phải bé hơn ngày hiện tại';
        },
        firstName(value) {
            return /^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]*( [A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]*)*$/
                .test(value.trim())
                    ? undefined
                    : 'Họ đệm phải bắt đầu bằng ký tư hoa';
        },
        lastName(value) {
            return /^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]*$/
                .test(value.trim())
                    ? undefined
                    : 'Tên phải bắt đầu bằng ký tư hoa';
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

    const handleValidatorEmail = () => {
        return handlerValidator($('input#email-id')[0], getMessengerError($('input#email-id')[0]));
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
                    a[b.name] = b.value.trim();
                    return a;
                }, {});
                if (this.onSubmit)
                    this.onSubmit(dataInput);
                else
                    formElement.submit();
            }
        }
    }

    const getCodeBtn = $('.form-group__item__text.get-code');

    if (getCodeBtn) {
        getCodeBtn.click(() =>{
            if (handleValidatorEmail()) {
                const email = $('input#email-id')[0].value;
                console.log(email);
                if (submitCode === "" || emailName !== email){
                    emailName = email;
                    submitCode = Math.random().toString(36).substring(2,8);
                    Email.sendEmail(email, "HTTTH Shop, Xác thực tài khoản!", 'Mã xác thực tài khoản của bạn là : ' + submitCode)
                        .then(
                            () => toast({title: 'Thành công!', message: 'Đã gửi mã xác thực đến email của bạn.', type: 'success', duration: 5000})
                        );
                } else
                    toast({title: 'Thành công!', message: 'Đã gửi mã xác thực đến email của bạn.', type: 'success', duration: 5000});
            }
        });
    }
}