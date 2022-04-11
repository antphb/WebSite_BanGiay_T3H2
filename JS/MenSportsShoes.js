const categoryIcons = $('.category__icon');
const categoryPrimaryBody = $('.category__primary__body');

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