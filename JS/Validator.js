function Validator(selector) {
    const formElement = document.querySelector(selector);
    const inputElementsHasRule = formElement.querySelectorAll('[rule]');
    const inputElements = [...formElement.querySelectorAll('input')];

    const rules = {};
    const validatorRules = {
        required(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email(value) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? undefined : 'Vui lòng nhập email';
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
                if (this.onSubmit)
                    this.onSubmit(dataInput);
                else
                    formElement.submit();
            }
        }
    }
}