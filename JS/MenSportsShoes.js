const categoryIcons = $('.category__icon');
const categoryPrimaryBody = $('.category__primary__body');
const categoryProductOnSale = $('.category__product__body--on-sale');
const categoryProductBestSellers = $('.category__product__body--best-sellers');
const categoryProductNewProducts = $('.category__product__body--new-products');
const contentProductFilterSortBy = $('.content-product__filter__sort__by');
const contentProductListElement = $('.content-product__list');
const contentProductFilterIconItem = $('.content-product__filter__icon__item');

const getPriceProduct = product => product.discount ? product.price * (100 - product.discount) / 100 : product.price;

const showModalProduct = productItem => {
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
                                            <img class="img-contain" src="./IMG/${product.listImage[0]}" alt="">
                                            <ul class="product-flags d-flex list-unstyled">
                                                <li class="product-flag reduced-price">Reduced Price</li>
                                                <li class="product-flag new">New</li>
                                            </ul>
                                        </div>
                                        <div data-length="${product.listImage.length}" class="modal__product__content__body__item__list">
                                            <button class="modal__product__content__body__item__list__btn ${product.listImage.length <= 4 && 'hidden'} d-flex align-items-center justify-content-center up">
                                                <i class="fas fa-chevron-up"></i>
                                            </button>
                                            <ul class="list-unstyled mb-0">
                                                ${product.listImage.map((itemImage, index) => {
                                                    return `<li class="${index === 0 && 'active'}"><img class="img-contain" src="./IMG/${itemImage}" alt=""></li>`;
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
                                            <button title="Add to Wishlist" class="btn p-0">
                                                <i class="fas fa-heart"></i>
                                                Add to Wishlist
                                            </button>
                                            <button title="Add to Compare" class="btn p-0 is-added">
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

const showModalTost = (selector, mess) => {
    mess.replace('$$', '\'');
    $(`${selector} .modal-body h3`).html(`${mess}`);
    $(selector).modal();
}

const handlerClickCompareCart = (element, selectModal, mess) => {
    $(element).toggleClass('active');
    if (!$(element).hasClass('active')) {
        mess = mess.replace('has been added to', 'was successfully removed from');
    }
    showModalTost(selectModal, mess);
}

const handlerClickCompare = (element, product, selectModal, mess) => {
    handlerClickCompareCart(element, selectModal, mess);
    let compareProductList = JSON.parse(localStorage.getItem('TTTHH-COMPARE-KEY')) ?? [];
    if ($(element).hasClass('active')) {
        compareProductList.push(product);
    } else {
        compareProductList = compareProductList.filter(item => !(item.name === product.name && item.price === product.price));
    }
    $('.header__user-menu__item__options__item--compare').html(compareProductList.length);
    localStorage.setItem('TTTHH-COMPARE-KEY', JSON.stringify(compareProductList));
}

const handlerClickCart = (element, product, selectModal, mess) => {
    handlerClickCompareCart(element, selectModal, mess);
    let compareProductList = JSON.parse(localStorage.getItem('TTTHH-CART-KEY')) ?? [];
    if (compareProductList.hasProduct(product)) {
        compareProductList = compareProductList.map(item => {
            if (item.name === product.name && item.price === product.price)
                return {...item, number: item.number+1};
            return item;
        });
    } else {
        compareProductList.push({...product, number: 1});
    }
    const numberProduct = compareProductList.reduce((prev, element) => prev + element.number, 0);
    $('.header__user-menu__item__number').html(numberProduct);
    localStorage.setItem('TTTHH-CART-KEY', JSON.stringify(compareProductList));
}

categoryIcons.click(function() {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        $(this).next('.category__submenu').animateAuto('height', 200)
    } else {
        $(this).next('.category__submenu').animate({"height": "0"}, 100, "linear");
    }
})

// * Start Add List Checkbox

const getHTMLCheckbox = (title, products) => {
    return `
        <h4 class="category__list__title">${title}</h4>
        <ul class="category__list category__list--checkbox">
            ${products.map(product => {
                return `
                    <li class="category__item">
                        <input id="${product.name}" value="${product.name}" type="checkbox" name="${title.toLowerCase()}">
                        <label for="${product.name}">${product.name} <span>(${product.number})</span></label>
                    </li>
                `;
            }).join('')}
        </ul>
    `;
}

const getHTMLColor = (title, products) => {
    return `
        <h4 class="category__list__title">${title}</h4>
        <ul class="category__list__color">
            ${products.map(product => `
                <li data-bg-color="${product.name}" class="category__item__color">
                    <span class="category__item__color__checkbox">
                        <input type="checkbox">
                    </span>
                    <span class="category__item__color__text">
                        ${product.name} <span>(${product.number})</span>
                    </span>
                </li>
            `).join('')}
        </ul>
    `;
}

const Categories = [
    {name: 'Women', number: 8},
    {name: 'Men', number: 10},
    {name: 'Couple', number: 5},
];

const Sizes = [
    {name: 'S', number: 8},
    {name: 'M', number: 12},
    {name: 'L', number: 12},
];

const Color = [
    {name: 'Grey', number: 2},
    {name: 'Beige', number: 2},
    {name: 'White', number: 2},
    {name: 'Red', number: 2},
    {name: 'Black', number: 6},
    {name: 'Orange', number: 4},
    {name: 'Blue', number: 5},
    {name: 'Green', number: 2},
    {name: 'Yellow', number: 3},
    {name: 'Brown', number: 1},
    {name: 'Pink', number: 2},
];

const Compositions = [
    {name: 'Cotton', number: 5},
    {name: 'Elastane', number: 1},
    {name: 'Polyester', number: 2},
    {name: 'Silk', number: 1},
    {name: 'Viscose', number: 2},
];

const Styles = [
    {name: 'Cottons', number: 5},
    {name: 'Elastanes', number: 1},
    {name: 'Polyesters', number: 2},
    {name: 'Silks', number: 1},
    {name: 'Viscoses', number: 2},
];

const Properties = [
    {name: 'Colorful Dress', number: 1},
    {name: 'Maxi Dress', number: 1},
    {name: 'Midi Dress', number: 1},
    {name: 'Short Dress', number: 2},
    {name: 'Short Sleeve', number: 2},
];

const Prices = [
    {name: '$44.00 - $48.00', number: 2},
    {name: '$49.00 - $51.00', number: 1},
    {name: '$56.00 - $59.00', number: 1},
    {name: '$61.00 - $64.00', number: 1},
    {name: '$67.00 - $74.00', number: 2},
    {name: '$88.00 - $92.00', number: 1},
    {name: '$105.00 - $110.00', number: 1},
    {name: '$176.00 - $183.00', number: 1},
    {name: '$261.00 - $271.00', number: 1},
    {name: '$351.00 - $366.00', number: 1},
];

categoryPrimaryBody.append(getHTMLCheckbox('Categories', Categories));
categoryPrimaryBody.append(getHTMLCheckbox('Size', Sizes));
categoryPrimaryBody.append(getHTMLColor('Color', Color));
categoryPrimaryBody.append(getHTMLCheckbox('Compositions', Compositions));
categoryPrimaryBody.append(getHTMLCheckbox('Styles', Styles));
categoryPrimaryBody.append(getHTMLCheckbox('Properties', Properties));
categoryPrimaryBody.append(getHTMLCheckbox('Price', Prices));

// * End Add List Checkbox

// * Start Set BackgroundColor CategoryListColor

const categoryItemColor = $('.category__item__color');

[...categoryItemColor].forEach(item => {
    $(item).children('.category__item__color__checkbox').css("background-color", item.getAttribute('data-bg-color'));
})

// * End Set BackgroundColor CategoryListColor

// * Start Add Category Product

const getHTMLListProduct = listProduct => {
    return `
        <ul class="category__product__list">
            ${listProduct.map(item => `
                <li class="category__product__item">
                    <div class="category__product__img">
                        <a href="">
                            <img class="img-cover " src="./IMG/${item.image}" alt="">
                            <img class="img-cover hover" src="./IMG/${item.imageHover}" alt="">
                        </a>
                    </div>
                    <div class="category__product__info">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h5 class="category__product__title">
                            <a href="">${item.name}</a>
                        </h5>
                        <div class="category__product__price">
                            <span class="old-price ${item.discount || 'hidden'}">$${item.price.toFixed(2)}</span>
                            <span class="discount ${item.discount || 'hidden'}">(-${item.discount}%)</span>
                            ${item.discount && '<br>' || ''}
                            <span class="price">$${getPriceProduct(item).toFixed(2)}</span>
                        </div>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
}

const listProductOnSale = [{
    image: 'MenSportsShoes-OnSale-1.jpg',
    imageHover: 'MenSportsShoes-OnSale-1-hover.jpg',
    name: 'Slip On Shoes',
    price: 390.89,
    discount: 10
},{
    image: 'MenSportsShoes-OnSale-2.jpg',
    imageHover: 'MenSportsShoes-OnSale-2-hover.jpg',
    name: 'Zeven Thrust Shoes',
    price: 290, 
    discount: 10
},{
    image: 'MenSportsShoes-OnSale-3.jpg',
    imageHover: 'MenSportsShoes-OnSale-3-hover.jpg',
    name: 'Aero Power Shoes',
    price: 390.89,
    discount: 20
}];

const listProductBestSellers = [{
    image: 'MenSportsShoes-BestSellers-1.jpg',
    imageHover: 'MenSportsShoes-BestSellers-1-hover.jpg',
    name: 'Asics Women\'s Shoes',
    price: 56.99
},{
    image: 'MenSportsShoes-BestSellers-2.jpg',
    imageHover: 'MenSportsShoes-BestSellers-2-hover.jpg',
    name: 'Nivia Tennis Shoes',
    price: 105.99
},{
    image: 'MenSportsShoes-BestSellers-3.jpg',
    imageHover: 'MenSportsShoes-BestSellers-3-hover.jpg',
    name: 'Lunar Force Shoes',
    price: 88.65
}];

const listProductNewProducts = [{
    image: 'MenSportsShoes-NewProduct-1.jpg',
    imageHover: 'MenSportsShoes-NewProduct-1-hover.jpg',
    name: 'Zeven Thrust Shoes',
    price: 290.00,
    discount: 10
},{
    image: 'MenSportsShoes-NewProduct-2.jpg',
    imageHover: 'MenSportsShoes-NewProduct-2-hover.jpg',
    name: 'Indoor Court Shoes',
    price: 45.99
},{
    image: 'MenSportsShoes-NewProduct-3.jpg',
    imageHover: 'MenSportsShoes-NewProduct-3-hover.jpg',
    name: 'Swerve Women\'s Shoes',
    price: 44.99
}];

categoryProductOnSale.html(getHTMLListProduct(listProductOnSale));
categoryProductBestSellers.html(getHTMLListProduct(listProductBestSellers));
categoryProductNewProducts.html(getHTMLListProduct(listProductNewProducts));

// * End Add Category Product

// * Start Handler Event Click Sort Product Content

contentProductFilterSortBy.click(function(e) {
    $(this).toggleClass('active');
    e.stopPropagation();
});

app.click(() => contentProductFilterSortBy.removeClass('active'));

// * End Handler Event Click Sort Product Content

// * Start Add Content Product List

const contentProductList = [
    {
        productFlags: ['Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-1.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-1-hover.jpg',
        name: 'Lunar Force Shoes',
        price: 98.5,
        discount: 10,
        color: ['Orange', 'Blue'],
        categories: ['Women', 'Men', ],
        size: ['S', 'M', 'L'],
        compositions: ['Cotton', ],
        styles: ['Casual', ],
        properties: ['Short Sleeve'],
        listImage: ['MenSportsShoes-ContentProduct-1.jpg', 'MenSportsShoes-ContentProduct-1-hover.jpg', 'MenSportsShoes-ContentProduct-1-1.jpg', 'MenSportsShoes-ContentProduct-1-2.jpg', 'MenSportsShoes-ContentProduct-1-3.jpg', 'MenSportsShoes-ContentProduct-1-4.jpg'],
    },{
        productFlags: ['On Sale', 'New'],
        image: 'MenSportsShoes-ContentProduct-2.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-2-hover.jpg',
        name: "Asics Women$$s Shoes",
        price: 56.99,
        color: ['White', 'Black'],
        categories: ['Women', ],
        size: ['S', 'M', 'L'],
        compositions: ['Cotton', ],
        styles: ['Casual', ],
        properties: ['Short Sleeve'],
        listImage: ['MenSportsShoes-ContentProduct-2.jpg', 'MenSportsShoes-ContentProduct-2-hover.jpg'],
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-3.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-3-hover.jpg',
        name: 'Nivia Tennis Shoes',
        price: 105.99,
        color: ['Orange'],
        categories: ['Men', ],
        size: ['S', 'M', 'L'],
        compositions: ['Cotton', ],
        styles: ['Girly', ],
        properties: ['Colorful Dress'],
        listImage: ['MenSportsShoes-ContentProduct-3.jpg', 'MenSportsShoes-ContentProduct-3-hover.jpg'],
    },{
        productFlags: ['Online Only', 'New'],
        image: 'MenSportsShoes-ContentProduct-4.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-4-hover.jpg',
        name: 'Plasma Running Shoe',
        price: 70.99,
        color: ['Beige', 'Pink'],
        categories: ['Men', ],
        size: ['S', 'M', 'L'],
        compositions: ['Viscose', ],
        styles: ['Dressy', ],
        properties: ['Short Dress'],
        listImage: ['MenSportsShoes-ContentProduct-4.jpg', 'MenSportsShoes-ContentProduct-4-hover.jpg'],
    },{
        productFlags: ['Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-5.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-5-hover.jpg',
        name: 'Saucony Ride Shoes',
        price: 64.50,
        discount: 5,
        color: ['Black', 'Orange', 'Blue', 'Yellow'],
        categories: ['Men', ],
        size: ['S', 'M', 'L'],
        compositions: ['Viscose', ],
        styles: ['Casual', ],
        properties: ['Maxi Dress'],
        listImage: ['MenSportsShoes-ContentProduct-5.jpg', 'MenSportsShoes-ContentProduct-5-hover.jpg'],
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-6.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-6-hover.jpg',
        name: 'Aero Power Shoes',
        price: 67.49,
        color: ['White', 'Yellow'],
        categories: ['Women', 'Men', 'Couple', ],
        size: ['S', 'M', 'L'],
        compositions: ['Polyester', ],
        styles: ['Girly', ],
        properties: ['Short Dress'],
        listImage: ['MenSportsShoes-ContentProduct-6.jpg', 'MenSportsShoes-ContentProduct-6-hover.jpg'],
    },{
        productFlags: ['Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-7.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-7-hover.jpg',
        name: 'Aero Power Shoes',
        price: 220.5,
        discount: 20,
        color: ['Green', 'Yellow'],
        categories: ['Women', 'Men', 'Couple', ],
        size: ['S', 'M', 'L'],
        compositions: ['Polyester', ],
        styles: ['Girly', ],
        properties: ['Midi Dress'],
        listImage: ['MenSportsShoes-ContentProduct-7.jpg', 'MenSportsShoes-ContentProduct-7-hover.jpg'],
    },{
        productFlags: ['On Sale', 'New'],
        image: 'MenSportsShoes-ContentProduct-8.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-8-hover.jpg',
        name: 'Slip On Shoes',
        price: 390.89,
        discount: 10,
        color: ['Gray', 'Red', 'Black'],
        categories: ['Women', 'Men', 'Couple', ],
        size: ['M', 'L'],
        compositions: ['Cotton', ],
        styles: [],
        properties: [],
        listImage: ['MenSportsShoes-ContentProduct-8.jpg', 'MenSportsShoes-ContentProduct-8-hover.jpg'],
    },{
        productFlags: ['Online Only', 'Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-9.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-9-hover.jpg',
        name: 'Saucony Running Shoes',
        price: 54.99,
        discount: 10,
        color: ['Gray', 'Red', 'Black', 'Blue'],
        categories: ['Men', ],
        size: ['M', 'L'],
        compositions: [],
        styles: [],
        properties: [],
        listImage: ['MenSportsShoes-ContentProduct-9.jpg', 'MenSportsShoes-ContentProduct-9-hover.jpg'],
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-10.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-10-hover.jpg',
        name: "Swerve Women$$s Shoes",
        price: 44.99,
        color: ['Black', 'Brown', 'Pink'],
        categories: ['Women', ],
        size: ['M', 'L'],
        compositions: ['Cotton', ],
        styles: ['Basic', ],
        properties: [],
        listImage: ['MenSportsShoes-ContentProduct-10.jpg', 'MenSportsShoes-ContentProduct-10-hover.jpg', 'MenSportsShoes-ContentProduct-10-1.jpg'],
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-11.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-11-hover.jpg',
        name: 'Indoor Court Shoes',
        price: 45.99,
        color: ['Beige', 'Orange', 'Blue'],
        categories: ['Women', 'Men', 'Couple', ],
        size: ['M', 'L'],
        compositions: ['Elastane', ],
        styles: ['Classic', ],
        properties: [],
        listImage: ['MenSportsShoes-ContentProduct-11.jpg', 'MenSportsShoes-ContentProduct-11-hover.jpg'],
    },{
        productFlags: ['Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-12.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-12-hover.jpg',
        name: 'Zeven Thrust Shoes',
        price: 290,
        discount: 10,
        color: ['Black', 'Blue', 'Green'],
        categories: ['Women', 'Men', 'Couple', ],
        size: ['S', 'M', 'L'],
        compositions: ['Silk', ],
        styles: ['Classic', ],
        properties: [],
        listImage: ['MenSportsShoes-ContentProduct-12.jpg', 'MenSportsShoes-ContentProduct-12-hover.jpg'],
    },
];

let filtersProductList = {};

const updateNumberContentProduct = products => {
    const length = products.length;
    const indexPage = 1;
    $('.content-product__filter__number span').html(length);
    $('.content-product__pagination__title .count').html(length);
    $('.content-product__pagination__title .from').html(length === 0 ? length : (indexPage-1)*9 + 1);
    $('.content-product__pagination__title .to').html(Math.min(length, indexPage*9));
    scrollToElement($('.content-product')[0], 'start');
}

const getHTMLContentProductList = (productList, filters) => {
    let products = [...productList];
    const i = +contentProductListElement[0].getAttribute('data-page');
    const dataFilter = contentProductListElement.attr('data-filter').split('|');

    if (dataFilter[0]) {
        products.sort((a,b) => {
            if (dataFilter[0] === 'price')
                if (getPriceProduct(a) !== getPriceProduct(b))
                    return getPriceProduct(a) > getPriceProduct(b) ? dataFilter[1] : -1 * dataFilter[1];
            if (a[dataFilter[0]] === b[dataFilter[0]])
                return getPriceProduct(a) > getPriceProduct(b) ? dataFilter[1] : -1 * dataFilter[1];
            return a[dataFilter[0]] > b[dataFilter[0]] ? dataFilter[1] : -1 * dataFilter[1];
        });
    } else
        products = [...productList];

    if (filters) {
        Object.keys(filters).forEach(filter => {
            if (filters[filter]?.length !== 0) {
                if (filter === 'price') {
                    products = products.filter(product => {
                        const price = getPriceProduct(product);
                        return filters[filter].some(priceFilter => {
                            const minPrice = priceFilter.split(' - ')[0].split('$')[1];
                            const maxPrice = priceFilter.split(' - ')[1].split('$')[1];
                            return price >= minPrice && price <= maxPrice;
                        })
                    })
                } else {
                    products = products.filter(product => product[filter].length + filters[filter].length !== [...new Set([...filters[filter], ...product[filter]])].length)
                }
            }
        })
    }

    updateNumberContentProduct(products);
    $('.content-product__pagination__btn-nav')[products.length <= 9 ? 'addClass' : 'removeClass']('hidden');

    const compareProductList = JSON.parse(localStorage.getItem('TTTHH-COMPARE-KEY')) ?? [];
    
    Array.prototype.hasProduct = function(product) {
        return this.find(item => item.name === product.name && item.price === product.price);
    }

    return `
        <div class="row no-gutters">
            ${products.map((product, index) => index < 9*(i-1) || index >= 9*i ? '' : `
                <div class="col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                    <div class="content-product__item pb-md-3 position-relative d-flex flex-column no-gutters">
                        <div class="content-product__item__img order-1">
                            <a href="">
                                <img class="img-cover" src="./IMG/${product.image}" alt="">
                                <img class="img-cover hover" src="./IMG/${product.imageHover}" alt="">
                                <ul class="product-flags d-flex flex-wrap list-unstyled">
                                    ${product.productFlags.map(productFlag => {
                                        let res = productFlag.toLowerCase().split(' ').join('-');
                                        return `
                                            <li class="product-flag mb-1 ${res}">${productFlag}</li>
                                        `;
                                    }).join('')}
                                </ul>
                            </a>
                        </div>
                        <div class="content-product__item__info order-3">
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <h4 class="content-product__item__info__name">
                                <a href="">${product.name.replace('$$', '\'')}</a>
                            </h4>
                            <p class="content-product__item__info__price">
                                <span class="mx-0 old-price ${product.discount || 'hidden'}">$${product.price.toFixed(2)}</span>
                                <span class="discount ${product.discount || 'hidden'}">(-${product.discount}%)</span>
                                <span class="price">$${getPriceProduct(product).toFixed(2)}</span>
                            </p>
                        </div>
                        <ul class="function-buttons list-unstyled order-2 mt-3-md mb-0-md">
                            <li class="hidden-sm" onclick='showModalProduct(${JSON.stringify(product)})' style="--i: 0;"><a class="d-flex align-items-center justify-content-center"><i class="fas fa-expand-arrows-alt"></i></a></li>
                            <li class="${compareProductList.hasProduct(product) && 'active'}" onclick='handlerClickCompare(this, ${JSON.stringify(product)}, "#modal-tost", "The product has been added to list compare. <a href=${`/ProductsCompare.html`}>View list compare.</a>")' style="--i: 1;"><a class="d-flex align-items-center justify-content-center"><i class="fas fa-redo"></i></a></li>
                            <li onclick='handlerClickCart(this, ${JSON.stringify(product)}, "#modal-tost", "${product.name} Product successfully added to your shopping cart. <a href=${`/Cart.html`}>View cart.</a>")' style="--i: 2;"><a class="d-flex align-items-center justify-content-center"><i class="fas fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

const getHTMLContentProductPagination = length => {
    if (length <= 1)
        return '';
    let res = `
        <div class="content-product__pagination__btn content-product__pagination__btn--first hidden">
            <i class="fas fa-long-arrow-alt-left"></i>
        </div>
        <div class="content-product__pagination__btn content-product__pagination__btn--first active">
            1
        </div>
    `;
    for (let i = 2; i < length; i++) {
        res += `
            <div class="content-product__pagination__btn">
                ${i}
            </div>
        `;
    }
    if (length >= 2)
        res += `
            <div class="content-product__pagination__btn content-product__pagination__btn--last">
                ${length}
            </div>
            <div class="content-product__pagination__btn content-product__pagination__btn--last">
                <i class="fas fa-long-arrow-alt-right"></i>
            </div>
        `;
    return res;
}

$('.content-product__filter__number span').html(contentProductList.length);
$('.content-product__pagination__title .count').html(contentProductList.length);
contentProductListElement.html(getHTMLContentProductList(contentProductList));
$('.content-product__pagination__btn-nav').html(getHTMLContentProductPagination(Math.ceil(contentProductList.length/9)));
$('.content-product__pagination__title .from').html(Math.min(1, contentProductList.length));
$('.content-product__pagination__title .to').html(Math.min(9, contentProductList.length));

// * End Add Content Product List

// * Start Handler Content Product Pagination
const contentProductPaginationBtn = $('.content-product__pagination__btn');

contentProductPaginationBtn.click(function() {
    let indexPage;
    contentProductPaginationBtn.removeClass('hidden');
    contentProductPaginationBtn.removeClass('active');
    if ($(this).hasClass('content-product__pagination__btn--first')) {
        indexPage = 1;
        $(contentProductPaginationBtn[0]).addClass('hidden');
        $(contentProductPaginationBtn[1]).addClass('active');
    } else if ($(this).hasClass('content-product__pagination__btn--last')) {
        indexPage = Math.ceil(contentProductList.length/9);
        let lengthPaginationBtn = contentProductPaginationBtn.length;
        $(contentProductPaginationBtn[lengthPaginationBtn-1]).addClass('hidden');
        $(contentProductPaginationBtn[lengthPaginationBtn-2]).addClass('active');
    } else {
        indexPage = (+contentProductListElement[0].getAttribute('data-page')) + 1;
        $(this).addClass('active');
    }
    contentProductListElement[0].setAttribute('data-page', indexPage);
    contentProductListElement.html(getHTMLContentProductList(contentProductList));
    $('.content-product__pagination__title .from').html((indexPage-1)*9 + 1);
    $('.content-product__pagination__title .to').html(Math.min(contentProductList.length, indexPage*9));
    scrollToElement($('.content-product')[0], 'start');
})

// * End Handler Content Product Pagination

// * Start Show Content Product List

contentProductFilterIconItem.click(function(e) {
    contentProductFilterIconItem.removeClass('active');
    $(this).addClass('active');

    const containerItem = $('.content-product__list > .row > div').children();
    const childrenElement = containerItem.children();

    if ($('.content-product__filter__icon__item--list').hasClass('active')) {
        $('.content-product__list > .row > div').removeClass();
        $('.content-product__list > .row > div').addClass('col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12');
        containerItem.addClass('row');  
        containerItem.removeClass('flex-column');  
        [...childrenElement].forEach((element, index) => {
            if (index % 3 === 0) {
                $(element).removeClass('order-1');
                $(element).addClass(' col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 mb-0');
            }
            else if (index % 3 === 1) {
                $(element).removeClass('order-3');
                $(element).addClass(' col col-xl-8 col-lg-8 col-md-6 col-sm-6 col-6');
            }
            else {
                $(element).removeClass('order-2');
            }
        });
    } else {
        $('.content-product__list > .row > div').removeClass();
        $('.content-product__list > .row > div').addClass('col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6');
        containerItem.removeClass('row');  
        containerItem.addClass('flex-column'); 
        [...childrenElement].forEach((element, index) => {
            if (index % 3 === 0) {
                $(element).addClass('order-1');
                $(element).removeClass('col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 mb-0');
            }
            else if (index % 3 === 1) {
                $(element).addClass('order-3');
                $(element).removeClass('col col-xl-8 col-lg-8 col-md-6 col-sm-6 col-6');
            }
            else {
                $(element).addClass('order-2');
            }
        });
    }
})

// * End Show Content Product List

// * Start Handler Sort Content Product List

const filterLabel = $('.content-product__filter__sort__by__name span.name');
const filterProductList = $('.content-product__filter__sort__by__list ul li');

[...filterProductList].forEach(filterItem => {
    $(filterItem).click(function() {
        filterLabel.html(this.innerHTML);
        contentProductListElement.attr('data-filter', this.getAttribute('data-filter'));
        contentProductListElement.attr('data-page', 1);
        contentProductPaginationBtn.removeClass('hidden');
        contentProductPaginationBtn.removeClass('active');
        $(contentProductPaginationBtn[0]).addClass('hidden');
        $(contentProductPaginationBtn[1]).addClass('active');
        contentProductListElement.html(getHTMLContentProductList(contentProductList));
        $('.content-product__pagination__title .from').html(1);
        $('.content-product__pagination__title .to').html(Math.min(contentProductList.length, 9));
        scrollToElement($('.content-product')[0], 'start');
    })
});

// * End Handler Sort Content Product List

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
    
    modalImgMenu.click(function() {
        activeItemList(modalImgMenu, $(this));
        imgModal[0].src = $(this).children()[0].src;
    });
    
    // * End Handler Event Click Img List Menu
    
    // * Start Handler Click Size List
    
    sizeList.click(function() {
        activeItemList(sizeList, $(this));
    });
    
    // * End Handler Click Size List
    
    // * Start Handler Click Color List
    
    colorList.click(function() {
        activeItemList(colorList, $(this));
    })
    
    // * End Handler Click Color List
    
    // * Start Handler Inc/Dec Quantity List
    
    $(quantityButtonList[0]).click(() => {
        inputQuantity[0].value = +inputQuantity[0].value + 1;
    })
    
    $(quantityButtonList[1]).click(() => {
        inputQuantity[0].value = +inputQuantity[0].value === 1 ? 1 : inputQuantity[0].value-1;
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
            if (-1*currMarginTop === maxMarginTop - 80) {
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

// * Start Handler Modal Tost

// $('#modal-tost').modal();

$('#modal-tost .btn.close').click(() => $('#modal-tost').modal('hide'));

// * End Handler Modal Tost

// * Start Handler Filter Category

$('.category__primary__body .category__item input').change(function() {
    const name = this.name;
    const value = this.value;
    if (this.checked) {
        if (filtersProductList[name]) {
            filtersProductList[name].push(value);
        } else {
            filtersProductList[name] = [value];
        }
    } else {
        filtersProductList[name] = filtersProductList[name].filter(item => item !== value);
    }
    contentProductListElement[0].setAttribute('data-page', 1);
    contentProductListElement.html(getHTMLContentProductList(contentProductList, filtersProductList));
});

$('.category__primary__body .category__item__color').click(function() {
    const value = this.getAttribute('data-bg-color');
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        if (filtersProductList['color']) {
            filtersProductList['color'].push(value);
        } else {
            filtersProductList['color'] = [value];
        }
    } else 
        filtersProductList['color'] = filtersProductList['color']?.filter(item => item !== value);
    contentProductListElement[0].setAttribute('data-page', 1);
    contentProductListElement.html(getHTMLContentProductList(contentProductList, filtersProductList));
});

$('.category__primary__body .clear-all span').click(()=> {
    [...$('.category__primary__body .category__item input:checked')].forEach(item => item.checked = false);
    $('.category__primary__body .category__item__color').removeClass('active');
    filtersProductList = {}; 
    contentProductListElement.html(getHTMLContentProductList(contentProductList));   
})

// * End Handler Filter Category

// * Start Content Product Function Button

// * End Content Product Function Button

// * Start Show/Hidden Filter Product Small

$('.btn--filter').click(() => {
    $('.col--filter').removeClass('hidden-sm');
    $('.col--product').addClass('hidden-sm');
    scrollToElement($('.col--filter')[0], 'start');
});

$('.btn-close--filter').click(() => {
    $('.col--filter').addClass('hidden-sm');
    $('.col--product').removeClass('hidden-sm');
    scrollToElement($('.content-product__filter')[0], 'start');
})

// $('.category__list').animateAuto('height', 200);

// * End Show/Hidden Filter Product Small

scrollToElement($('main')[0], 'start');