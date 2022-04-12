const categoryIcons = $('.category__icon');
const categoryPrimaryBody = $('.category__primary__body');
const categoryProductOnSale = $('.category__product__body--on-sale');
const categoryProductBestSellers = $('.category__product__body--best-sellers');
const categoryProductNewProducts = $('.category__product__body--new-products');
const contentProductFilterSortBy = $('.content-product__filter__sort__by');

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
                        <div class="category__product__rating">
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
                            <span class="price">$${item.discount ? (item.price*(100 - item.discount)/100).toFixed(2) : item.price.toFixed(2)}</span>
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