(() => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var page = url.searchParams.get("page");

    const jsUcfirst = string => string.charAt(0).toUpperCase() + string.slice(1);

    let listProduct = 'list-products';
    let sitemap = 'sitemap';
    let introduce = 'introduce';
    let category = 'category';
    let filter = 'filter';
    let active = '.header__navbar__item--';

    if (page) {
        document.title = jsUcfirst(page);
        listProduct += `-${page}`;
        sitemap += `-${page}`;
        introduce += `-${page}`;
        category += `-${page}`;
        filter += `-${page}`;
        active += page;
    } else {
        active += 'product';
    }

    const urls = [listProduct, sitemap, introduce, category, filter];

    const getHTMLIntroduce = products => `
        <div class="row">
            ${products.map(product => `
                <div class="col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                    <li class="product-introduction__item">
                        <div title="Women" class="product-introduction__img">
                            <a href="">
                                <img class="img-cover" src="./IMG/${product.image}" alt="${product.title}">
                            </a>
                        </div>
                        <h4 class="product-introduction__name">
                            <a href="">${product.title}</a>
                        </h4>
                        <p class="product-introduction__description">${product.description}</p>
                    </li>
                </div>
            `).join("")}
        </div>
    `;

    const getHTMLCategoryDanger = category => `
        <div class="category__title">
            <a href="">${category.title.toUpperCase()}</a>
        </div>
        <ul class="category__list">
            ${category['category-list'].map(categoryItem => `
                <li class="category__item">
                    <a href="${categoryItem.link || ''}" class="category__link">${categoryItem.title} (<span>${categoryItem.number}</span>)</a>
                    <div class="category__icon ${categoryItem.submenu || 'hidden'}">
                        <i class="fas fa-plus"></i>
                    </div>
                    <ul class="category__submenu">
                        ${categoryItem.submenu ? categoryItem.submenu.map(subItem => `
                            <li class="category__subitem">
                                <span class="category__subicon">
                                    <i class="fas fa-chevron-right"></i>
                                </span>
                                <a href="" class="category__sublink">${subItem.title} (<span>${subItem.number}</span>)</a>
                            </li>
                        `).join('') : ''}
                    </ul>
                </li>
            `).join('')}
        </ul>
    `;

    Promise.all(urls.map(u=>fetch(`https://comfortable-fox-gear.cyclic.app/${u}`))).then(responses =>
        Promise.all(responses.map(res => res.text()))
    ).then(texts => {
        texts[1] = JSON.parse(texts[1]);
        $('section').prepend(`
            <nav class="sitemap" style="background: url(${texts[1].background});" data-sitemap-item="${texts[1].item.join(', ')}" data-sitemap-link="${texts[1].link.join(', ')}" data-sitemap-title="${texts[1].title}"></nav>
        `)
        Sitemap();

        $('.sub-sitemap').html(`
            <img class="img-fluid" src="${texts[1].background}" alt="${texts[1].title}">
            <h1 class="sitemap__title mt-4 mb-0">${texts[1].title}</h1>
        `)

        const introduction = JSON.parse(texts[2]);
        $('.content .introduce').html(introduction.description);
        if (introduction['list-products'])
            $('.product-introduction').html(getHTMLIntroduce(introduction['list-products']));

        const categoryDanger = JSON.parse(texts[3]);
        if (categoryDanger.title)
            $('.category__danger').html(getHTMLCategoryDanger(categoryDanger));

        const {Categories, Sizes, Color, Compositions, Styles, Properties, Prices} = JSON.parse(texts[4]);

        handleSportsShoes(JSON.parse(texts[0]), Categories, Sizes, Color, Compositions, Styles, Properties, Prices);
        if (window.innerWidth >= 991)
            $(active)?.addClass('active');
        $('.loading').addClass('hidden');
        $('.app').removeClass('hidden');
    });
})();

const getPriceProduct = product => product.discount ? product.price * (100 - product.discount) / 100 : product.price;

function handleSportsShoes(contentProductList, Categories, Sizes, Color, Compositions, Styles, Properties, Prices) {
    const categoryIcons = $('.category__icon');
    const categoryPrimaryBody = $('.category__primary__body');
    const categoryProductOnSale = $('.category__product__body--on-sale');
    const categoryProductBestSellers = $('.category__product__body--best-sellers');
    const categoryProductNewProducts = $('.category__product__body--new-products');
    const contentProductFilterSortBy = $('.content-product__filter__sort__by');
    const contentProductListElement = $('.content-product__list');
    const contentProductFilterIconItem = $('.content-product__filter__icon__item');

    categoryIcons.click(function () {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            $(this).next('.category__submenu').animateAuto('height', 200)
        } else {
            $(this).next('.category__submenu').animate({
                "height": "0"
            }, 100, "linear");
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

    if (Categories) {
        categoryPrimaryBody.append(getHTMLCheckbox('Categories', Categories));
        categoryPrimaryBody.append(getHTMLCheckbox('Size', Sizes));
        categoryPrimaryBody.append(getHTMLColor('Color', Color));
        categoryPrimaryBody.append(getHTMLCheckbox('Compositions', Compositions));
        categoryPrimaryBody.append(getHTMLCheckbox('Styles', Styles));
        categoryPrimaryBody.append(getHTMLCheckbox('Properties', Properties));
        categoryPrimaryBody.append(getHTMLCheckbox('Price', Prices));
    }

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
                                <img class="img-cover " src="./IMG/${item.image}" alt="${item.name}">
                                <img class="img-cover hover" src="./IMG/${item.imageHover}" alt="${item.name}">
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
    }, {
        image: 'MenSportsShoes-OnSale-2.jpg',
        imageHover: 'MenSportsShoes-OnSale-2-hover.jpg',
        name: 'Zeven Thrust Shoes',
        price: 290,
        discount: 10
    }, {
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
    }, {
        image: 'MenSportsShoes-BestSellers-2.jpg',
        imageHover: 'MenSportsShoes-BestSellers-2-hover.jpg',
        name: 'Nivia Tennis Shoes',
        price: 105.99
    }, {
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
    }, {
        image: 'MenSportsShoes-NewProduct-2.jpg',
        imageHover: 'MenSportsShoes-NewProduct-2-hover.jpg',
        name: 'Indoor Court Shoes',
        price: 45.99
    }, {
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

    contentProductFilterSortBy.click(function (e) {
        $(this).toggleClass('active');
        e.stopPropagation();
    });

    app.click(() => contentProductFilterSortBy.removeClass('active'));

    // * End Handler Event Click Sort Product Content

    // * Start Add Content Product List

    let filtersProductList = {};

    const updateNumberContentProduct = products => {
        const length = products.length;
        const indexPage = 1;
        $('.content-product__filter__number span').html(length);
        $('.content-product__pagination__title .count').html(length);
        $('.content-product__pagination__title .from').html(length === 0 ? length : (indexPage - 1) * 9 + 1);
        $('.content-product__pagination__title .to').html(Math.min(length, indexPage * 9));
        scrollToElement($('.content-product')[0], 'start');
    }

    const getHTMLContentProductList = (productList, filters) => {
        let products = [...productList];
        const i = +contentProductListElement[0].getAttribute('data-page');
        const dataFilter = contentProductListElement.attr('data-filter').split('|');

        if (dataFilter[0]) {
            products.sort((a, b) => {
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

        console.log(products);

        $('.content-product__pagination__btn-nav')[products.length <= 9 ? 'addClass' : 'removeClass']('hidden');

        const compareProductList = JSON.parse(localStorage.getItem('TTTHH-COMPARE-KEY')) ?? [];

        return `
            <div class="row no-gutters">
                ${products.map((product, index) => index < 9*(i-1) || index >= 9*i ? '' : `
                    <div class="col col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="content-product__item pb-md-3 position-relative d-flex flex-column no-gutters">
                            <div class="content-product__item__img order-1">
                                <a href="${window.location.href.includes('WebSite_BanGiay_T3H2') ? '/WebSite_BanGiay_T3H2' : ''}/ProductDetaildPage.html?product=${product.slug}">
                                    <img class="img-cover" src="./IMG/${product.image}" alt="${product.name}">
                                    <img class="img-cover hover" src="./IMG/${product.imageHover}" alt="${product.name}">
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
                                    <a href="${window.location.href.includes('WebSite_BanGiay_T3H2') ? '/WebSite_BanGiay_T3H2' : ''}/ProductDetaildPage.html?product=${product.slug}">${product.name.replace('$$', '\'')}</a>
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
    $('.content-product__pagination__btn-nav').html(getHTMLContentProductPagination(Math.ceil(contentProductList.length / 9)));
    $('.content-product__pagination__title .from').html(Math.min(1, contentProductList.length));
    $('.content-product__pagination__title .to').html(Math.min(9, contentProductList.length));

    // * End Add Content Product List

    // * Start Handler Content Product Pagination
    const contentProductPaginationBtn = $('.content-product__pagination__btn');

    contentProductPaginationBtn.click(function () {
        let indexPage;
        contentProductPaginationBtn.removeClass('hidden');
        contentProductPaginationBtn.removeClass('active');
        if ($(this).hasClass('content-product__pagination__btn--first')) {
            indexPage = 1;
            $(contentProductPaginationBtn[0]).addClass('hidden');
            $(contentProductPaginationBtn[1]).addClass('active');
        } else if ($(this).hasClass('content-product__pagination__btn--last')) {
            indexPage = Math.ceil(contentProductList.length / 9);
            let lengthPaginationBtn = contentProductPaginationBtn.length;
            $(contentProductPaginationBtn[lengthPaginationBtn - 1]).addClass('hidden');
            $(contentProductPaginationBtn[lengthPaginationBtn - 2]).addClass('active');
        } else {
            indexPage = (+contentProductListElement[0].getAttribute('data-page')) + 1;
            $(this).addClass('active');
        }
        contentProductListElement[0].setAttribute('data-page', indexPage);
        contentProductListElement.html(getHTMLContentProductList(contentProductList));
        $('.content-product__pagination__title .from').html((indexPage - 1) * 9 + 1);
        $('.content-product__pagination__title .to').html(Math.min(contentProductList.length, indexPage * 9));
        scrollToElement($('.content-product')[0], 'start');
    })

    // * End Handler Content Product Pagination

    // * Start Show Content Product List

    contentProductFilterIconItem.click(function (e) {
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
                } else if (index % 3 === 1) {
                    $(element).removeClass('order-3');
                    $(element).addClass(' col col-xl-8 col-lg-8 col-md-6 col-sm-6 col-6');
                } else {
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
                } else if (index % 3 === 1) {
                    $(element).addClass('order-3');
                    $(element).removeClass('col col-xl-8 col-lg-8 col-md-6 col-sm-6 col-6');
                } else {
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
        $(filterItem).click(function () {
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

    // * Start Handler Filter Category

    $('.category__primary__body .category__item input').change(function () {
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

    $('.category__primary__body .category__item__color').click(function () {
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

    $('.category__primary__body .clear-all span').click(() => {
        [...$('.category__primary__body .category__item input:checked')].forEach(item => item.checked = false);
        $('.category__primary__body .category__item__color').removeClass('active');
        filtersProductList = {};
        contentProductListElement.html(getHTMLContentProductList(contentProductList));
    })

    // * End Handler Filter Category

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

    // * End Show/Hidden Filter Product Small

    scrollToElement($('main')[0], 'start');
}