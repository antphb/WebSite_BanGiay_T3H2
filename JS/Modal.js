const showModalTost = (selector, mess) => {
    mess.replace('$$', '\'');
    $(`${selector} .modal-body h3`).html(`${mess}`);
    $(selector).modal();
    // * Start Handler Modal Tost

    $('#modal-tost .btn.close').click(() => $('#modal-tost').modal('hide'));

    // * End Handler Modal Tost
}

const handlerClickCompareCart = (element, selectModal, mess) => {
    if (!$(element).hasClass('active')) {
        mess = mess.replace('has been added to', 'was successfully removed from');
    }
    showModalTost(selectModal, mess);
}

const handlerClickCompare = (element, product, selectModal, mess) => {
    $('#modal-product')?.modal?.['hide'];
    let compareProductList = JSON.parse(localStorage.getItem('TTTHH-COMPARE-KEY')) ?? [];
    console.log(compareProductList);
    console.log(product);
    console.log(compareProductList.hasProduct(product));
    if (compareProductList.hasProduct(product)) {
        $(element).removeClass('active');
        compareProductList = compareProductList.filter(item => item.slug !== product.slug);
    } else if (compareProductList.length >= 3) {
        mess = `You cannot add more than 3 product(s) to the product comparison.` + mess.split('. ')[1];
    } else {
        $(element).addClass('active');
        compareProductList.push(product);
    }
    $('.header__user-menu__item__options__item--compare').html(compareProductList.length);
    handlerClickCompareCart(element, selectModal, mess);
    localStorage.setItem('TTTHH-COMPARE-KEY', JSON.stringify(compareProductList));
}

const handlerClickCart = (element, product, selectModal, mess) => {
    handlerClickCompareCart(element, selectModal, mess);
    let compareProductList = JSON.parse(localStorage.getItem('TTTHH-CART-KEY')) ?? [];
    if (compareProductList.hasProduct(product)) {
        compareProductList = compareProductList.map(item => {
            if (item.slug === product.slug)
                return {
                    ...item,
                    number: item.number + 1
                };
            return item;
        });
    } else {
        compareProductList.push({
            ...product,
            number: 1
        });
    }
    const numberProduct = compareProductList.reduce((prev, element) => prev + element.number, 0);
    $('.header__user-menu__item__number').html(numberProduct);
    localStorage.setItem('TTTHH-CART-KEY', JSON.stringify(compareProductList));
}

// * Start Handler Modal

function handlerProductModal() {
    const modalImgMenu = $('#modal-product .modal__product__content__body__item__list ul li');
    const imgModal = $('#modal-product .modal__product__content__body__item__img img');
    const sizeList = $('#modal-product .modal__product__content__body__item .size-list ul li');
    const colorList = $('#modal-product .modal__product__content__body__item .color-list ul li');
    const quantityButtonList = $('#modal-product .modal__product__content__body__item .quantity button');
    const inputQuantity = $('#modal-product .modal__product__content__body__item .quantity input');
    const upModalButton = $('.modal__product__content__body__item__list button.up');
    const downModalButton = $('.modal__product__content__body__item__list button.down');
    const firstItemListImage = $('.modal__product__content__body__item__list > ul > li:first-child')[0];

    const activeItemList = (list, item) => {
        list.removeClass('active');
        item.addClass('active');
    }

    // * Start Handler Event Click Img List Menu

    modalImgMenu.click(function () {
        activeItemList(modalImgMenu, $(this));
        imgModal[0].src = $(this).children()[0].src;
    });

    // * End Handler Event Click Img List Menu

    // * Start Handler Click Size List

    sizeList.click(function () {
        activeItemList(sizeList, $(this));
    });

    // * End Handler Click Size List

    // * Start Handler Click Color List

    colorList.click(function () {
        activeItemList(colorList, $(this));
    })

    // * End Handler Click Color List

    // * Start Handler Inc/Dec Quantity List

    $(quantityButtonList[0]).click(() => {
        inputQuantity[0].value = +inputQuantity[0].value + 1;
    })

    $(quantityButtonList[1]).click(() => {
        inputQuantity[0].value = +inputQuantity[0].value === 1 ? 1 : inputQuantity[0].value - 1;
    })

    // * End Handler Inc/Dec Quantity List

    // * Start Handler Up/Down List Image

    upModalButton.click(() => {
        const length = upModalButton.parent().attr('data-length');
        const maxMarginTop = (length - 4) * 80;
        const currMarginTop = +firstItemListImage.style.marginTop.split('px')[0];
        if (!upModalButton.hasClass('disabled')) {
            downModalButton.removeClass('disabled');
            firstItemListImage.style.marginTop = `${currMarginTop - 80}px`;
            if (-1 * currMarginTop === maxMarginTop - 80) {
                upModalButton.addClass('disabled');
            }
        }
    })

    downModalButton.click(() => {
        const currMarginTop = +firstItemListImage.style.marginTop.split('px')[0];
        if (!downModalButton.hasClass('disabled')) {
            upModalButton.removeClass('disabled');
            firstItemListImage.style.marginTop = `${currMarginTop + 80}px`;
            if (currMarginTop === -80) {
                downModalButton.addClass('disabled');
            }
        }
    })

    // * End Handler Up/Down List Image

    $('#modal-product .close').click(() => $('#modal-product').modal('hide'));
}

// * End Handler Modal

const showModalProduct = productItem => {
    const compareProductList = JSON.parse(localStorage.getItem('TTTHH-COMPARE-KEY')) ?? [];
    let product = productItem;
    product.name = product.name.replace('$$', '\'');
    const modal = $('#modal-product');
    const htmlModal = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="modal__product__content">
                            <div class="modal__product__content__header text-right">
                                <button class="close">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="modal__product__content__body">
                                <div class="row">
                                    <div class="col col-xl-6 col-lg-6">
                                        <div class="modal__product__content__body__item modal__product__content__body__item--left d-flex">
                                            <div class="modal__product__content__body__item__img position-relative flex-grow-1 flex-shrink-1">
                                                <img class="img-contain" src="./IMG/${product.listImage[0]}" alt="${product.name}">
                                                <ul class="product-flags d-flex list-unstyled">
                                                    ${product.productFlags.map(productFlag => `
                                                        <li class="product-flag reduced-price">${productFlag.toLowerCase().split(' ').join('-')}</li>
                                                    `).join('')}
                                                </ul>
                                            </div>
                                            <div data-length="${product.listImage.length}" class="modal__product__content__body__item__list">
                                                <button class="modal__product__content__body__item__list__btn ${product.listImage.length <= 4 && 'hidden'} d-flex align-items-center justify-content-center up">
                                                    <i class="fas fa-chevron-up"></i>
                                                </button>
                                                <ul class="list-unstyled mb-0">
                                                    ${product.listImage.map((itemImage, index) => {
                                                        return `<li class="${index === 0 && 'active'}"><img class="img-contain" src="./IMG/${itemImage}" alt="${product.name}"></li>`;
                                                    }).join('')}
                                                </ul>
                                                <button class="modal__product__content__body__item__list__btn ${product.listImage.length <= 4 && 'hidden'} d-flex align-items-center justify-content-center down disabled">
                                                    <i class="fas fa-chevron-down"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-xl-6 col-lg-6">
                                        <div class="modal__product__content__body__item modal__product__content__body__item--right">
                                            <h3 class="name">${product.name}</h3>
                                            <p class="price">
                                                <span class="price">$${getPriceProduct(product)}</span>
                                                <span class="old-price ${product.discount || 'hidden'}">$${product.price}</span>
                                                <span class="discount ${product.discount || 'hidden'}">(Save ${product.discount}%)</span>
                                            </p>
                                            <p class="detail">
                                                Tax excluded Delivery: 1 to 3 weeks
                                            </p>
                                            <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <div class="d-flex align-items-center size-list">
                                                <label class="mb-0" for="">Size</label>
                                                <ul class="mb-0 list-unstyled d-flex">
                                                    ${product.size.map((size, index) => {
                                                        return `<li class="${index === 0 && 'active'}">${size}</li>`;
                                                    }).join('')}
                                                </ul>
                                            </div>
                                            <div class="d-flex align-items-center color-list">
                                                <label class="mb-0" for="">Color</label>
                                                <ul class="mb-0 list-unstyled d-flex">
                                                    ${product.color.map((color, index) => {
                                                        return `<li class="${index === 0 && 'active'}" style="--color: ${color};"></li>`;
                                                    }).join('')}
                                                </ul>
                                            </div>
                                            <div class="d-flex align-items-center quantity">
                                                <label class="mb-0" for="">Quantity</label>
                                                <div class="d-flex">
                                                    <button class="d-flex align-items-center justify-content-center inc"><i class="fas fa-chevron-up"></i></button>
                                                    <input type="number" class="text-center" value="1" min="0" name="" id="">
                                                    <button class="d-flex align-items-center justify-content-center dec"><i class="fas fa-chevron-down"></i></button>
                                                </div>
                                            </div>
                                            <div class="group-btns">
                                                <button class="btn btn-primary">Add to cart</button>
                                                <button title="Add to Compare" onclick='handlerClickCompare(this, ${JSON.stringify(product)}, "#modal-tost", "The product has been added to list compare. <a href=${`/ProductsCompare.html`}>View list compare.</a>")' class="btn p-0 ${compareProductList.hasProduct(product) && 'is-added'}">
                                                    <i class="fas fa-redo"></i>
                                                    Add to Compare
                                                </button>
                                            </div>
                                            <p class="in-stock">
                                                <span class="in-stock__icon in-stock__icon--success">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="in-stock--text">In stock</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal__product__content__footer">
                                <a title="Share" href="" class="btn btn--facebook"><i class="fab fa-facebook-f"></i></a>
                                <a title="Tweet" href="" class="btn btn--twitter"><i class="fab fa-twitter"></i></a>
                                <a title="Google+" href="" class="btn btn--google"><i class="fab fa-google-plus-g"></i></a>
                                <a title="Pinterest" href="" class="btn btn--pinterest"><i class="fab fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    modal.html(htmlModal);
    handlerProductModal();
    modal.modal();
}