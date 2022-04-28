
let compareProducts = JSON.parse(localStorage.getItem('TTTHH-COMPARE-KEY')) ?? [];

const getPriceProduct = product => product.discount ? product.price * (100 - product.discount) / 100 : product.price;

// * Compare Product List

const removeCompareProducts = slug => {
    compareProducts = compareProducts.filter(product => product.slug !== slug);

    localStorage.setItem('TTTHH-COMPARE-KEY', JSON.stringify(compareProducts));
    $('.content__list').html(getHTMLCompareProducts(compareProducts));
}

const getHTMLCompareProducts = products => {

    return `                            
        <table class="table-bordered">
                <tr>
                    <td class="align-top">Features:</td>
                    ${products.map(product => `
                        <td>
                            <div class="content-product__item__delete text-right">
                                <button onclick="removeCompareProducts('${product.slug}')" class="border-0 bg-white">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            <div class="content-product__item mx-auto">
                                <div class="content-product__item__img position-relative">
                                    <a class="d-block" href="${window.location.href.includes('WebSite_BanGiay_T3H2') ? '/WebSite_BanGiay_T3H2' : ''}/ProductDetaildPage.html?product=${product.slug}">
                                        <img class="img-contain" src="./IMG/${product.image}" alt="${product.name}">
                                    </a>
                                    <ul class="product-flags d-flex flex-wrap list-unstyled">
                                        ${product.productFlags.map(productFlag => `
                                            <li class="product-flag ${productFlag.toLowerCase().split(' ').join('-')}">
                                                ${productFlag}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <button onclick='handlerClickCart(this, ${JSON.stringify(product)}, "#modal-tost", "${product.name} Product successfully added to your shopping cart. <a href=${`/Cart.html`}>View cart.</a>")' class="btn content-product__item__add-cart col-12">
                                    Add to cart
                                </button>
                                <div class="content-product__item__info">
                                    <h4 class="content-product__item__info__title text-center">
                                        <a href="${window.location.href.includes('WebSite_BanGiay_T3H2') ? '/WebSite_BanGiay_T3H2' : ''}/ProductDetaildPage.html?product=${product.slug}">${product.name}</a>
                                    </h4>
                                    <p class="content-product__item__info__description text-center">Temporibus autem quibusdam et aut officiis debitis aut...</p>
                                    <div class="content-product__item__info__price text-center">
                                        <span class="price-old ${product.discount || 'hidden'}">$${product.price.toFixed(2)}</span>
                                        <span class="discount ${product.discount || 'hidden'}">(-${product.discount}%)</span>
                                        <span class="price">$${getPriceProduct(product).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                    `).join('')}
                </tr>
                <tr>
                    <td class="align-top">Compositions</td>
                    ${products.map(product => `
                        <td class="text-center">${product.compositions[0] || ''}</td>
                    `).join('')}
                </tr>
                <tr>
                    <td class="align-top">Styles</td>
                    ${products.map(product => `
                        <td class="text-center">${product.styles[0] || ''}</td>
                    `).join('')}
                </tr>
                <tr>
                    <td class="align-top">Properties</td>
                    ${products.map(product => `
                        <td class="text-center">${product.properties[0] || ''}</td>
                    `).join('')}
                </tr>
            </table>
    `;
}

(() => {
    const contentListCompare = $('.content__list');

    setTimeout(() => {
        if (compareProducts.length === 0) {
            contentListCompare.addClass('content__list--no-item');
            contentListCompare.html(`
                <div class="content__no-item">
                    <span class="content__no-item__icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    There are no products selected for comparison.
                </div>
            `);
        } else {
            $('.content__list').html(getHTMLCompareProducts(compareProducts));
        }
        $('.app').removeClass('hidden');
        $('.loading').addClass('hidden');
    }, 1000);

    console.log(compareProducts);
})();

$('.btn.content__link').attr('href', `${window.location.href.includes('WebSite_BanGiay_T3H2') ? 'https://antphb.github.io/WebSite_BanGiay_T3H2/' : '/'}`);
