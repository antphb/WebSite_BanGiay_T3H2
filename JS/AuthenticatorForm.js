const showPasswordBtn = $('.form-group__item__text.show-password');

// * Start Handler Show/Hidden Password Form

showPasswordBtn.click(function() {
    $(this).toggleClass('show');

    const isShow = $(this).hasClass('show');
    const inputElement = $(this).parent().children('input');

    this.innerHTML = isShow && 'Hide' || 'Show';

    inputElement[0].type = isShow && 'text' || 'password';
})

// * End Handler Show/Hidden Password Form