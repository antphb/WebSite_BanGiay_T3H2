const categoryIcons = $('.category__icon');
const categoryPrimaryBody = $('.category__primary__body');
const categoryProductOnSale = $('.category__product__body--on-sale');
const categoryProductBestSellers = $('.category__product__body--best-sellers');
const categoryProductNewProducts = $('.category__product__body--new-products');
const contentProductFilterSortBy = $('.content-product__filter__sort__by');
const contentProductListElement = $('.content-product__list');
const contentProductFilterIconItem = $('.content-product__filter__icon__item');

const getPriceProduct = product => product.discount ? product.price * (100 - product.discount) / 100 : product.price;

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
                        <input type="checkbox" name="categories">
                        <label for="">${product.name} <span>(${product.number})</span></label>
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
            `)}
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
        discount: 10
    },{
        productFlags: ['On Sale', 'New'],
        image: 'MenSportsShoes-ContentProduct-2.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-2-hover.jpg',
        name: 'Asics Women\'s Shoes',
        price: 56.99
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-3.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-3-hover.jpg',
        name: 'Nivia Tennis Shoes',
        price: 105.99
    },{
        productFlags: ['Online Only', 'New'],
        image: 'MenSportsShoes-ContentProduct-4.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-4-hover.jpg',
        name: 'Plasma Running Shoe',
        price: 70.99
    },{
        productFlags: ['Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-5.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-5-hover.jpg',
        name: 'Saucony Ride Shoes',
        price: 64.50,
        discount: 5
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-6.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-6-hover.jpg',
        name: 'Aero Power Shoes',
        price: 67.49
    },{
        productFlags: ['Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-7.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-7-hover.jpg',
        name: 'Aero Power Shoes',
        price: 220.5,
        discount: 20
    },{
        productFlags: ['On Sale', 'New'],
        image: 'MenSportsShoes-ContentProduct-8.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-8-hover.jpg',
        name: 'Slip On Shoes',
        price: 390.89,
        discount: 10
    },{
        productFlags: ['Online Only', 'Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-9.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-9-hover.jpg',
        name: 'Saucony Running Shoes',
        price: 54.99,
        discount: 10
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-10.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-10-hover.jpg',
        name: 'Swerve Women\'s Shoes',
        price: 44.99
    },{
        productFlags: ['New'],
        image: 'MenSportsShoes-ContentProduct-11.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-11-hover.jpg',
        name: 'Indoor Court Shoes',
        price: 45.99
    },{
        productFlags: ['Reduced Price', 'New'],
        image: 'MenSportsShoes-ContentProduct-12.jpg',
        imageHover: 'MenSportsShoes-ContentProduct-12-hover.jpg',
        name: 'Zeven Thrust Shoes',
        price: 290,
        discount: 10
    },
];

const getHTMLContentProductList = (products) => {
    const i = +contentProductListElement[0].getAttribute('data-page');
    const dataFilter = contentProductListElement.attr('data-filter').split('|');

    if (dataFilter[0]) {
        products.sort((a,b) => {
            if (dataFilter[0] === 'price') 
                return getPriceProduct(a) > getPriceProduct(b) ? dataFilter[1] : -1 * dataFilter[1];
            return a[dataFilter[0]] > b[dataFilter[0]] ? dataFilter[1] : -1 * dataFilter[1];
        });
    }

    return `
        <div class="row no-gutters">
            ${products.map((product, index) => index < 9*(i-1) || index >= 9*i ? '' : `
                <div class="col col-xl-4 col-lg-4">
                    <div class="content-product__item">
                        <div class="content-product__item__img">
                            <a href="">
                                <img class="img-cover" src="./IMG/${product.image}" alt="">
                                <img class="img-cover hover" src="./IMG/${product.imageHover}" alt="">
                                <ul class="product-flags d-flex list-unstyled">
                                    ${product.productFlags.map(productFlag => {
                                        let res = productFlag.toLowerCase().split(' ').join('-');
                                        return `
                                            <li class="product-flag ${res}">${productFlag}</li>
                                        `;
                                    }).join('')}
                                </ul>
                            </a>
                            <ul class="function-buttons list-unstyled">
                                <li style="--i: 0;"><a class="d-flex align-items-center justify-content-center"><i class="fas fa-expand-arrows-alt"></i></a></li>
                                <li style="--i: 1;"><a class="d-flex align-items-center justify-content-center"><i class="fas fa-redo"></i></a></li>
                                <li style="--i: 2;"><a class="d-flex align-items-center justify-content-center"><i class="fas fa-heart"></i></a></li>
                                <li style="--i: 3;"><a class="d-flex align-items-center justify-content-center"><i class="fas fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="content-product__item__info">
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <h4 class="content-product__item__info__name">
                                <a href="">${product.name}</a>
                            </h4>
                            <p class="content-product__item__info__price">
                                <span class="old-price ${product.discount || 'hidden'}">$${product.price.toFixed(2)}</span>
                                <span class="discount ${product.discount || 'hidden'}">(-${product.discount}%)</span>
                                <span class="price">$${getPriceProduct(product).toFixed(2)}</span>
                            </p>
                        </div>
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
        $('.content-product__list > .row > div').addClass('col col-xl-12 col-lg-12');
        containerItem.addClass('row');  
        [...childrenElement].forEach((element, index) => {
            if (index % 2 === 0)
                $(element).addClass('col col-xl-4 col-lg-4 mb-0');
            else
                $(element).addClass('col col-xl-8 col-lg-8');
        });
    } else {
        $('.content-product__list > .row > div').removeClass();
        $('.content-product__list > .row > div').addClass('col col-xl-4 col-lg-4');
        containerItem.removeClass('row');  
        [...childrenElement].forEach((element, index) => {
            if (index % 2 === 0)
                $(element).removeClass('col col-xl-4 col-lg-4 mb-0');
            else
                $(element).removeClass('col col-xl-8 col-lg-8');
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