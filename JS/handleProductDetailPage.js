var url_string = window.location.href;
var url = new URL(url_string);
var productSlug = url.searchParams.get("product");

const getPriceProduct = product => product.discount ? product.price * (100 - product.discount) / 100 : product.price;

fetch(`https://comfortable-fox-gear.cyclic.app/list-products?slug=${productSlug}`)
    .then(data => data.json())
    .then(products => {
        const product = products[0];
        $('section').html(`
            <div class="site__map">
                <p><a href="index.html" class="site__map-home">HOME</a> <span> > </span>
                    <a class="site-map-product-details" href="">${product.name.replace('$$', '\'').toUpperCase()}</a></p>
            </div>

            <div class="form-register-product row no-gutters">
                <div class="form-register-product-left col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-register-product-left__box-image">
                        <div class="form-register-product-left__box-image__status-product">
                            ${product.productFlags.map(productFlag => `
                                <span class="form-register-product-left__status_price ${productFlag.toLowerCase().split(' ').join('-')}">${productFlag}</span>
                            `).join('')}
                        </div>
                        <div class="form-register-product__image__product-main">
                            <img id="zoom-id" src="IMG/${product.imageZoom[0]}" data-zoom-image="IMG/${product.imageZoom[0]}" alt="anh 1" class="form-register-product__image__product__item">
                        </div>
                        <div class="form-register-product-left__tool-zoom"> <i class="fas fa-search-plus"></i></div>
                    </div>
                    
                    <div class="form-register-product__list" id="thumb-image">
                        ${product.imageZoom.map((itemImage, index) => `
                            <div class="form-register-product__list-item">
                                <a class="form-register-product__list__item__link ${index === 0 && 'active'}" href="#" data-image="IMG/${itemImage}" data-zoom-image="IMG/${itemImage}">
                                    <img src="IMG/${itemImage}" alt="anh ${index+1}" class="form-register-product__list-img">
                                </a>
                            </div>
                        `).join('')}                        
                    </div>
                </div>
                <div class="form-register-product-right col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <p class="form-register-product-right__name-product">Lunar Force Shoes</p>
                    <ul class="form-register-product-right__list__social">
                        <li class="form-register-product-right__item__social"><a href="https://www.facebook.com/" class="form-register-product-right__link__social"><i class="fab fa-facebook-f"></i></a></li>
                        <li class="form-register-product-right__item__social"><a href="https://twitter.com/?lang=vi" class="form-register-product-right__link__social"><i class="fab fa-twitter"></i></a></li>
                        <li class="form-register-product-right__item__social"><a href="https://myaccount.google.com/profile" class="form-register-product-right__link__social"><i class="fab fa-google-plus-g"></i></a></li>
                        <li class="form-register-product-right__item__social"><a href="https://www.pinterest.com/" class="form-register-product-right__link__social"><i class="fab fa-pinterest"></i></a></li>
                    </ul>
                    <div class="form-register-product-right__box-price">
                        <span class="form-register-product-right__box-price__price-now">$${getPriceProduct(product)}</span>
                        <span class="form-register-product-right__box-price__price-old ${product.discount || 'hidden'}">$${product.price}</span>
                        <span class="form-register-product-right__box-price__discount-price ${product.discount || 'hidden'}">(Save ${product.discount}%)</span>
                        <p class="form-register-product-right__delivery-time">Tax excluded Delivery: <span class="form-register-product-right__delivery-time__number">1 to 3 weeks</span></p>
                        <p class="form-register-product-right__product-description">Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
                    </div>
                
                    <div class="row form-register-product-right__option no-gutters">
                        <div class="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-register-product-right__option__label">
                            <p>Size</p>
                        </div>
                        <div class="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 row form-register-product-right__option__size-list">
                            ${product.size.map((size, index) => `
                                <label for="choose-size-${index+1}" class="form-register-product-right__option__size-list__box">
                                    <input type="radio" name="product-size" value="${size}" data-product-attribute="${index+1}" id="choose-size-${index+1}" 
                                    class="form-register-product-right__option__size form-register-product-right__option__choose-list" ${index === 0 && 'checked'}>
                                    <span>${size}</span>
                                </label>
                            `).join('')}                        
                        </div>
                        <div class="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-register-product-right__option__label">
                            <p>Color</p>
                        </div>
                        <div class="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 row form-register-product-right__option__color-list">
                            ${product.color.map((color, index) => `
                                <label for="choose-color-${index+1}" class="form-register-product-right__option__color-list__box">
                                    <input type="radio" value="${color}" name="product-color" id="choose-color-${index+1}" class="form-register-product-right__option__choose-color" ${index === 0 && 'checked'}>
                                    <span class="color-${index+1}" style="--color: ${color};"></span>
                                </label>
                            `).join('')}
                        </div>
                        <div class="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-register-product-right__option__label">
                            <p>Quantity</p>
                        </div>
                        <div class="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 row form-register-product-right__option__quantity-list">
                            <i class="fas fa-angle-up" id="option__color-list__up-quantity"></i>
                            <input type="text" name="" id="option__color-list__input-quantity" value="1">
                            <i class="fas fa-angle-down" id="option__color-list__down-quantity"></i>
                        </div>
                    
                    </div>
                    <div class="row form-register-product-right__group-btn">
                        <div onclick='handlerClickCart(this, ${JSON.stringify(product)}, "#modal-tost", "${product.name} Product successfully added to your shopping cart. <a href=${`/Cart.html`}>View cart.</a>")' class="col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 form-register-product-right__add-cart btn">ADD TO CART</div>
                        <div onclick='handlerClickCompare(this, ${JSON.stringify(product)}, "#modal-tost", "The product has been added to list compare. <a href=${`/ProductsCompare.html`}>View list compare.</a>")' class="col col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 form-register-product-right__add-compare btn ${compareProductList.hasProduct(product) && 'is-added'}"><i class="fas fa-redo-alt"></i>Add to Compare</div>
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-register-product-right__in-stock btn"><i class="fa-solid fa-check"></i>In stock</div>
                    </div>  
                    <div class="form-register-product-right__service">
                        <ul class="form-register-product-right__service__list">
                            <li class="form-register-product-right__service_item"> <img src="IMG/ic_verified_user_black_36dp_1x.png" alt="anh bao ve"> Security policy (edit with Customer reassurance module)</li>
                            <li class="form-register-product-right__service_item"> <img src="IMG/ic_local_shipping_black_36dp_1x.png" alt="anh van hang"> Delivery policy (edit with Customer reassurance module)</li>
                            <li class="form-register-product-right__service_item"> <img src="IMG/ic_swap_horiz_black_36dp_1x.png" alt="anh doi hang"> Return policy (edit with Customer reassurance module)</li>
                        </ul>
                        
                    </div>
                </div>
            </div>
            <div class="product__list__tab">
                <ul class="product__list__tab__menu row no-gutters">
                    <li class="product__list__tab__item"><a id="product__box__contentOfTab__Description" href="#" class="product__list__tab__link active">DESCRIPTION</a></li>
                    <li class="product__list__tab__item"><a id="product__box__contentOfTab__Product-details" href="#" class="product__list__tab__link">PRODUCT DETAILS</a></li>
                    <li class="product__list__tab__item"><a id="product__box__contentOfTab__Review" href="#" class="product__list__tab__link">REVIEWS</a></li>
                </ul>
                <div class="product__box__contentOfTab">
                    <div class="product__box__contentOfTab__Description active">
                        <p class="product__box__contentOfTable__Description__show">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum 
                            deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum 
                            fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta 
                            nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus,
                            omnis voluptas assumenda est, omnis dolor repellendus.
                            <br>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum.
                        </p>

                    </div>
                    <div class="product__box__contentOfTab__Product-details row no-gutters">
                        <a href="#" class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <img class="product__box__contentOfTab__Product-details__brand-logo" src="IMG/anh_thuong-hieu.jpg" alt="fashion premium pretashop Theme">
                        </a>
                        <p class="product__box__contentOfTab__Product-details__reference col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">Reference <span class="contentOfTab__Product-details__reference__name-product">Balencia</span></p>
                        <p class="product__box__contentOfTab__Product-details__in-stock col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">Stock <span class="contentOfTab__Product-details__in-stock__number">99 Items</span></p>
                        <p class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">Data sheet</p>
                        <div class="no-gutters row col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 contentOfTab__Product-details__table">
                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb"><p>Compositions</p></div>
                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb product__box__contentOfTab__Product-details__Compositions"><p>Cotton</p></div>
                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 f6f6f6"> <p>Styles</p> </div>
                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 f6f6f6 product__box__contentOfTab__Product-details__Styles"> <p>Casual</p> </div>
                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb"> <p>Properties</p></div>
                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb product__box__contentOfTab__Product-details__Properties"><p>Short Sleeve</p></div>
                        </div>
                    </div>
                    <div class="product__box__contentOfTab__Review">
                        <p class="product__box__contentOfTab__Review-description">No customer reviews for the moment.</p>
                    </div>
                    
                </div>
            </div>
        `);
        $('.loading').addClass('hidden');
        $('.app').removeClass('hidden');
        handleProductDetailPage();
    });

function handleProductDetailPage() {
    const elemBtnUpQuantity = document.querySelector("#option__color-list__up-quantity");
    const elemInputQuantity = document.querySelector("#option__color-list__input-quantity");
    const elemBtnDownQuantity = document.querySelector("#option__color-list__down-quantity");
    const elemsLinkImageSlickSlide = document.querySelectorAll(".form-register-product__list__item__link");
    const elemListBtnDesc = Array.from(document.querySelectorAll(".product__list__tab__link"));
    
    function start() {  
        elemInputQuantity.addEventListener("blur", ()=>{
           
            let number = parseInt( elemInputQuantity.value);;
            if (isNaN(number) || number <= 0){
                elemInputQuantity.value = 1;
            }
        })
        elemBtnUpQuantity.addEventListener("click", () => {

            elemInputQuantity.value = elemInputQuantity.value - 0 + 1;
        })
        elemBtnDownQuantity.addEventListener("click", () => {
            if (elemInputQuantity.value - 0 > 1) {
                elemInputQuantity.value -= 1;
            }
        })

        elemListBtnDesc.forEach((value) => {
            value.addEventListener("click", (e) => {
                e.preventDefault();
                elemActiving = document.querySelector(".product__list__tab__link.active");
                elemActiving.classList.remove("active");
                value.classList.add("active");

                elemContentActiving = document.querySelector(".product__box__contentOfTab > .active");
                elemContentActiving.classList.remove("active");

                document.querySelector("." + value.id).classList.add("active");
            })
        })
        

        $(".form-register-product__list").slick({
            infinite: false,
            slidesToShow: 5,
            prevArrow: '<button class="slide-arrow prev-arrow"><i class="fa-solid fa-angle-left"></i></button>',
            nextArrow: '<button class="slide-arrow next-arrow"><i class="fa-solid fa-angle-right"></i></button>',

            responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                }
            ],
        })
        $("#zoom-id").elevateZoom({
            gallery: "thumb-image",
            cursor: "pointer",
            galleryActiveClass: "active",
            imageCrossfade: true,
            tint: true,
            tintColour: 'rgba(0, 0, 0, 0.5)',
            tintOpacity: 0.5,



        });
        $(".form-register-product-left__tool-zoom").bind("click", function (e) {
            var ez = $('#zoom-id').data('elevateZoom');

            $.fancybox(ez.getGalleryList());
            console.log($(".fancybox-item.fancybox-close"))
            $(".fancybox-item.fancybox-close").html(`aaaaaaaaa`);
            return false;
        })
        $("#zoom-id").bind("click", function (e) {
            var ez = $('#zoom-id').data('elevateZoom');

            $.fancybox(ez.getGalleryList());
            console.log($(".fancybox-item.fancybox-close"))
            $(".fancybox-item.fancybox-close").html(`aaaaaaaaa`);
            return false;
        });
        elemsLinkImageSlickSlide.forEach((value) => {
            value.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
            })
        })
    }
    start();

    $(window).resize(function () {
        var w = $(window).width();
        if (w <= 575) {

            window.location.reload(true);
            start();
            console.log("load mobile");
            return;
        }
        if (w <= 991) {

            window.location.reload(true);
            start();
            console.log("load tablet");
            return;
        }
        if (w >= 1200) {

            window.location.reload(true);
            start();
            console.log("load pc");
            return;
        }


    });
}
