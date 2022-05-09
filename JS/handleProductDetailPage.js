var url_string = window.location.href,
	url = new URL(url_string),
	productSlug = url.searchParams.get("product");
const getPriceProduct = o => o.discount ? o.price * (100 - o.discount) / 100 : o.price;

function handleProductDetailPage()
{
	const o = document.querySelector("#option__color-list__up-quantity"),
		t = document.querySelector("#option__color-list__input-quantity"),
		i = document.querySelector("#option__color-list__down-quantity"),
		e = document.querySelectorAll(".form-register-product__list__item__link"),
		l = Array.from(document.querySelectorAll(".product__list__tab__link"));

	function c()
	{
		t.addEventListener("blur", (() =>
		{
			let number = parseInt(t.value);
			if (number <= 0 || isNaN(number))
			{
				t.value = 1;
			}
		})), o.addEventListener("click", (() =>
		{
			t.value = t.value - 0 + 1
		})), i.addEventListener("click", (() =>
		{
			t.value - 0 > 1 && (t.value -= 1)
		})), l.forEach((o =>
		{
			o.addEventListener("click", (t =>
			{
				t.preventDefault(), elemActiving = document.querySelector(".product__list__tab__link.active"), elemActiving.classList.remove("active"), o.classList.add("active"), elemContentActiving = document.querySelector(".product__box__contentOfTab > .active"), elemContentActiving.classList.remove("active"), document.querySelector("." + o.id).classList.add("active")
			}))
		})), $(".form-register-product__list").slick(
		{
			infinite: !1,
			slidesToShow: 5,
			prevArrow: '<button class="slide-arrow prev-arrow"><i class="fa-solid fa-angle-left"></i></button>',
			nextArrow: '<button class="slide-arrow next-arrow"><i class="fa-solid fa-angle-right"></i></button>',
			responsive: [
			{
				breakpoint: 991,
				settings:
				{
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: !0
				}
			},
			{
				breakpoint: 575,
				settings:
				{
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: !0
				}
			}]
		}), $("#zoom-id").elevateZoom(
		{
			gallery: "thumb-image",
			cursor: "pointer",
			galleryActiveClass: "active",
			imageCrossfade: !0,
			tint: !0,
			tintColour: "rgba(0, 0, 0, 0.5)",
			tintOpacity: .5
		}), $(".form-register-product-left__tool-zoom").bind("click", (function (o)
		{
			var t = $("#zoom-id").data("elevateZoom");
			return $.fancybox(t.getGalleryList()), console.log($(".fancybox-item.fancybox-close")), $(".fancybox-item.fancybox-close").html("aaaaaaaaa"), !1
		})), $("#zoom-id").bind("click", (function (o)
		{
			var t = $("#zoom-id").data("elevateZoom");
			return $.fancybox(t.getGalleryList()), console.log($(".fancybox-item.fancybox-close")), $(".fancybox-item.fancybox-close").html("aaaaaaaaa"), !1
		})), e.forEach((o =>
		{
			o.addEventListener("click", (o =>
			{
				o.stopPropagation(), o.preventDefault()
			}))
		}))
	}
	c(), $(window).resize((function ()
	{
		var o = $(window).width();
		return o <= 575 ? (window.location.reload(!0), c(), void console.log("load mobile")) : o <= 991 ? (window.location.reload(!0), c(), void console.log("load tablet")) : o >= 1200 ? (window.location.reload(!0), c(), void console.log("load pc")) : void 0
	}))
}
fetch(`https://json-server-web-giay-btl.herokuapp.com/list-products?slug=${productSlug}`).then((o => o.json())).then((o =>
{
	const t = o[0];
	$("section").html(`\n <div class="site__map">\n <p><a href="index.html" class="site__map-home">HOME</a> <span> > </span>\n                    <a class="site-map-product-details" href="">${t.name.replace("$$","'").toUpperCase()}</a></p>\n            </div>\n\n            <div class="form-register-product row no-gutters">\n                <div class="form-register-product-left col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">\n                    <div class="form-register-product-left__box-image">\n                        <div class="form-register-product-left__box-image__status-product">\n                            ${t.productFlags.map((o=>`\n                                <span class="form-register-product-left__status_price ${o.toLowerCase().split(" ").join("-")}">${o}</span>\n                            `)).join("")}\n                        </div>\n                        <div class="form-register-product__image__product-main">\n                            <img id="zoom-id" src="IMG/${t.imageZoom[0]}" data-zoom-image="IMG/${t.imageZoom[0]}" alt="anh 1" class="form-register-product__image__product__item">\n                        </div>\n                        <div class="form-register-product-left__tool-zoom"> <i class="fas fa-search-plus"></i></div>\n                    </div>\n                    \n                    <div class="form-register-product__list" id="thumb-image">\n                        ${t.imageZoom.map(((o,t)=>`\n                            <div class="form-register-product__list-item">\n                                <a class="form-register-product__list__item__link ${0===t&&"active"}" href="#" data-image="IMG/${o}" data-zoom-image="IMG/${o}">\n                                    <img src="IMG/${o}" alt="anh ${t+1}" class="form-register-product__list-img">\n                                </a>\n                            </div>\n                        `)).join("")}                        \n                    </div>\n                </div>\n                <div class="form-register-product-right col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">\n                    <p class="form-register-product-right__name-product">Lunar Force Shoes</p>\n                    <ul class="form-register-product-right__list__social">\n                        <li class="form-register-product-right__item__social"><a href="https://www.facebook.com/" class="form-register-product-right__link__social"><i class="fab fa-facebook-f"></i></a></li>\n                        <li class="form-register-product-right__item__social"><a href="https://twitter.com/?lang=vi" class="form-register-product-right__link__social"><i class="fab fa-twitter"></i></a></li>\n                        <li class="form-register-product-right__item__social"><a href="https://myaccount.google.com/profile" class="form-register-product-right__link__social"><i class="fab fa-google-plus-g"></i></a></li>\n                        <li class="form-register-product-right__item__social"><a href="https://www.pinterest.com/" class="form-register-product-right__link__social"><i class="fab fa-pinterest"></i></a></li>\n                    </ul>\n                    <div class="form-register-product-right__box-price">\n                        <span class="form-register-product-right__box-price__price-now">$${getPriceProduct(t)}</span>\n                        <span class="form-register-product-right__box-price__price-old ${t.discount||"hidden"}">$${t.price}</span>\n                        <span class="form-register-product-right__box-price__discount-price ${t.discount||"hidden"}">(Save ${t.discount}%)</span>\n                        <p class="form-register-product-right__delivery-time">Tax excluded Delivery: <span class="form-register-product-right__delivery-time__number">1 to 3 weeks</span></p>\n                        <p class="form-register-product-right__product-description">Introduced in 1982, the Air Force 1 redefined basketball footwear from the hardwood to the tarmac. It was the first basketball sneaker to house Nike Air, but its innovative nature has since taken a back seat to its status as a street icon.</p>\n                    </div>\n                \n                    <div class="row form-register-product-right__option no-gutters">\n                        <div class="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-register-product-right__option__label">\n                            <p>Size</p>\n                        </div>\n                        <div class="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 row form-register-product-right__option__size-list">\n                            ${t.size.map(((o,t)=>`\n                                <label for="choose-size-${t+1}" class="form-register-product-right__option__size-list__box">\n                                    <input type="radio" name="product-size" value="${o}" data-product-attribute="${t+1}" id="choose-size-${t+1}" \n                                    class="form-register-product-right__option__size form-register-product-right__option__choose-list" ${0===t&&"checked"}>\n                                    <span>${o}</span>\n                                </label>\n                            `)).join("")}                        \n                        </div>\n                        <div class="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-register-product-right__option__label">\n                            <p>Color</p>\n                        </div>\n                        <div class="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 row form-register-product-right__option__color-list">\n                            ${t.color.map(((o,t)=>`\n                                <label for="choose-color-${t+1}" class="form-register-product-right__option__color-list__box">\n                                    <input type="radio" value="${o}" name="product-color" id="choose-color-${t+1}" class="form-register-product-right__option__choose-color" ${0===t&&"checked"}>\n                                    <span class="color-${t+1}" style="--color: ${o};"></span>\n                                </label>\n                            `)).join("")}\n                        </div>\n                        <div class="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 form-register-product-right__option__label">\n                            <p>Quantity</p>\n                        </div>\n                        <div class="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 row form-register-product-right__option__quantity-list">\n                            <i class="fas fa-angle-up" id="option__color-list__up-quantity"></i>\n                            <input type="text" name="" id="option__color-list__input-quantity" value="1">\n                            <i class="fas fa-angle-down" id="option__color-list__down-quantity"></i>\n                        </div>\n                    \n                    </div>\n                    <div class="row form-register-product-right__group-btn">\n                        <div onclick='handlerClickCart(this, ${JSON.stringify(t)}, "#modal-tost", "${t.name} Product successfully added to your shopping cart. <a href=/Cart.html>View cart.</a>")' class="col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 form-register-product-right__add-cart btn">ADD TO CART</div>\n                        <div onclick='handlerClickCompare(this, ${JSON.stringify(t)}, "#modal-tost", "The product has been added to list compare. <a href=/ProductsCompare.html>View list compare.</a>")' class="col col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 form-register-product-right__add-compare btn ${compareProductList.hasProduct(t)&&"is-added"}"><i class="fas fa-redo-alt"></i>Add to Compare</div>\n                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-register-product-right__in-stock btn"><i class="fa-solid fa-check"></i>In stock</div>\n                    </div>  \n                    <div class="form-register-product-right__service">\n                        <ul class="form-register-product-right__service__list">\n                            <li class="form-register-product-right__service_item"> <img src="IMG/ic_verified_user_black_36dp_1x.png" alt="anh bao ve"> Security policy (edit with Customer reassurance module)</li>\n                            <li class="form-register-product-right__service_item"> <img src="IMG/ic_local_shipping_black_36dp_1x.png" alt="anh van hang"> Delivery policy (edit with Customer reassurance module)</li>\n                            <li class="form-register-product-right__service_item"> <img src="IMG/ic_swap_horiz_black_36dp_1x.png" alt="anh doi hang"> Return policy (edit with Customer reassurance module)</li>\n                        </ul>\n                        \n                    </div>\n                </div>\n            </div>\n            <div class="product__list__tab">\n                <ul class="product__list__tab__menu row no-gutters">\n                    <li class="product__list__tab__item"><a id="product__box__contentOfTab__Description" href="#" class="product__list__tab__link active">DESCRIPTION</a></li>\n                    <li class="product__list__tab__item"><a id="product__box__contentOfTab__Product-details" href="#" class="product__list__tab__link">PRODUCT DETAILS</a></li>\n                    <li class="product__list__tab__item"><a id="product__box__contentOfTab__Review" href="#" class="product__list__tab__link">REVIEWS</a></li>\n                </ul>\n                <div class="product__box__contentOfTab">\n                    <div class="product__box__contentOfTab__Description active">\n                        <p class="product__box__contentOfTable__Description__show">Styled for the '70s. Loved in the '80s. Classic in the '90s. Ready for the future. The Nike Blazer Mid '77 Vintage delivers a timeless design that's easy to wear. Its unbelievably crisp leather upper gets broken in beautifully, and is paired with bold retro branding and luscious suede accents for a premium feel. Exposed foam on the tongue and a special midsole finish make it look like you've just pulled them from the history books. Go ahead, perfect your outfit.                       </p>\n\n                    </div>\n                    <div class="product__box__contentOfTab__Product-details row no-gutters">\n                        <a href="#" class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">\n                            <img class="product__box__contentOfTab__Product-details__brand-logo" src="IMG/anh_thuong-hieu.jpg" alt="fashion premium pretashop Theme">\n                        </a>\n                        <p class="product__box__contentOfTab__Product-details__reference col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">Reference <span class="contentOfTab__Product-details__reference__name-product">Balencia</span></p>\n                        <p class="product__box__contentOfTab__Product-details__in-stock col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">Stock <span class="contentOfTab__Product-details__in-stock__number">99 Items</span></p>\n                        <p class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">Data sheet</p>\n                        <div class="no-gutters row col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 contentOfTab__Product-details__table">\n                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb"><p>Compositions</p></div>\n                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb product__box__contentOfTab__Product-details__Compositions"><p>Cotton</p></div>\n                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 f6f6f6"> <p>Styles</p> </div>\n                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 f6f6f6 product__box__contentOfTab__Product-details__Styles"> <p>Casual</p> </div>\n                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb"> <p>Properties</p></div>\n                            <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ebebeb product__box__contentOfTab__Product-details__Properties"><p>Short Sleeve</p></div>\n                        </div>\n                    </div>\n                    <div class="product__box__contentOfTab__Review">\n                        <p class="product__box__contentOfTab__Review-description">No customer reviews for the moment.</p>\n                    </div>\n                    \n                </div>\n            </div>\n        `), $(".loading").addClass("hidden"), $(".app").removeClass("hidden"), handleProductDetailPage()
}));