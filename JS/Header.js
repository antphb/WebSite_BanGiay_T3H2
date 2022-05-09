const header = document.querySelector('header');
const cartProductList = JSON.parse(localStorage.getItem('TTTHH-CART-KEY')) ?? [];
const numberProduct = cartProductList.reduce((prev, element) => prev + element.number, 0);
const compareProductList = JSON.parse(localStorage.getItem('TTTHH-COMPARE-KEY')) ?? [];
const numberOfComponents = compareProductList.length;

header.classList.add('header');
header.innerHTML = `
    <div class="header__user-menu-box">
        <div class="container">
            <div class="row no-gutters">
                <div class="header__user-menu__list header__user-menu__list--left">
                    <div class="header__user-menu__item">
                        <span>En
                            <i class="fas fa-chevron-down"></i>
                        </span>
                        <div class="header__user-menu__item__option">
                            <ul class="header__user-menu__item__option__list">
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link">
                                        <img src="IMG/quoc_co_hoa_ky.jpg" alt="quốc kỳ hoa kỳ">
                                        <span class="header__user-menu__item__options__item__name">English</span>
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link">
                                        <img src="IMG/quoc_ky_nuoc_phap.jpg" alt="quốc kỳ pháp">
                                        <span class="header__user-menu__item__options__item__name">France</span>
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link">
                                        <img src="IMG/quoc_ky_nuoc_duc.jpg" alt="quốc kỳ nước đức">
                                        <span class="header__user-menu__item__options__item__name">Germany</span>
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link">
                                        <img src="IMG/quoc_ky_nuoc_y.jpg" alt="quốc kỳ nước ý">
                                        <span class="header__user-menu__item__options__item__name">Italia</span>
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item"> 
                                    <a href="#" class="header__user-menu__item__options__item__link">
                                        <img src="IMG/quoc_ky_nuoc_tbn.jpg" alt="quốc kỳ tây ban nha">
                                        <span class="header__user-menu__item__options__item__name">Spain</span>
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link">
                                        <img src="IMG/quoc_ky_arap.jpg" alt="quốc kỳ nước ả rập">
                                        <span class="header__user-menu__item__options__item__name">Arabic</span>
                                    </a>
                                
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="header__user-menu__item">
                        <span>&#36; Usd
                        <i class="fas fa-chevron-down"></i>
                        </span>
                        <div class="header__user-menu__item__option">
                            <ul class="header__user-menu__item__option__list">
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__name">
                                        &#8364; Euro
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__name">
                                        &#36; USD
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="#" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__name">
                                        Đ VND
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header__user-menu__list header__user-menu__list--right ml-auto">
                    <div class="header__user-menu__item header__user-menu__item--account">
                        <i class="user far fa-user-circle"></i>
                        <span>Account</span>
                        <i class="fas fa-chevron-down"></i>
                        <div class="header__user-menu__item__option">
                            <ul class="header__user-menu__item__option__list login-request">
                                <li class="header__user-menu__item__options__item login">
                                    <a href="./MyAccount.html" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__link--name header__user-menu__item__options__item__name">
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item sign-out-btn login">
                                    <a href="./Login.html" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__name">
                                        <i class="fas fa-lock"></i>
                                        Sign out
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item logout">
                                    <a href="./Login.html" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__name">
                                        <i class="fas fa-unlock"></i>
                                        Sign In
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="./MyAccount.html" class="login-link header__user-menu__item__options__item__link header__user-menu__item__options__item__name"><i class="fas fa-user"></i>
                                    My Account</a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="./ProductsCompare.html" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__name">
                                        <i class="aaaa fas fa-redo"></i>
                                    Compare (<span class="header__user-menu__item__options__item--compare">${numberOfComponents}</span>)
                                    </a>
                                </li>
                                <li class="header__user-menu__item__options__item">
                                    <a href="./cartPage.html" class="header__user-menu__item__options__item__link header__user-menu__item__options__item__name">
                                    <i class="fas fa-shopping-cart"></i>
                                    Checkout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="header__user-menu__item header__user-menu__item--search">
                        <div class="header__user-menu__item__option">
                            <div class="header__user-menu__item__options__item header__user-menu__item--search__box">
                                <input class="header__user-menu__item__options__item__input" type="text" placeholder="Search our catalog">
                                <i class="header__user-menu__item--search__icon fas fa-search"></i>
                            
                            </div>
                        </div>
                        <div class="header__user-menu__item--search__box-icon">
                            <i class="header__user-menu__item__box-search__icon fas fa-search"></i>
                            <i class="header__user-menu__item__box-close__icon fas fa-times"></i>
                        </div>
                        
                        
                    </div>

                    <div class="col-line"></div>

                    <div class="header__user-menu__item header__user-menu__item--cart">
                        <a href="cartPage.html"> <i class="fas fa-shopping-cart"></i>
                        <span class="header__user-menu__item__number">${numberProduct}</span>    
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <nav class="header__navbar">
        <a href="${window.location.href.includes('WebSite_BanGiay_T3H2') ? 'https://antphb.github.io/WebSite_BanGiay_T3H2/' : '/'}" class="header__logo">
            <img class="img-cover" src="./IMG/logo3.png" alt="HTTTH">
        </a>

        <div class="container">
            <div class="row no-gutters">
                <div class="header__navbar__menu-btn show-medium">
                    <i class="fas fa-bars"></i>
                </div>

                <div class="header__navbar__modal">
                    <div class="header__navbar__container">     
                        <div class="header__navbar__close-menu show-medium">
                            Close
                        </div>

                        <ul class="header__navbar__list full-width header__navbar__list--left">
                            <li class="header__navbar__item header__navbar__item--home full-width">
                                <a href="index.html" class="header__navbar__link">Home</a>
                            </li>
                            <li class="header__navbar__item header__navbar__item--men full-width header__navbar__item--no-position">
                                <a href="./SportsShoes.html?page=men" class="header__navbar__link">
                                    Men
                                    <i class="hidden-medium fas fa-angle-down"></i>
                                    <span class="header__navbar__item__note header__navbar__item__note--hot">Hot</span>
                                    <span class="header__navbar__link__icon-mobile show-medium">
                                        <i class="plus fas fa-plus"></i>
                                        <i class="minus fas fa-minus"></i>
                                    </span>
                                </a>
                                <div class="header__navbar__item__submenu header__navbar__item__submenu--full-width">
                                    <div class="row">
                                        <div class="col col-xl-3 col-lg-3 col-md-12">
                                            <div class="header__navbar__item__submenu__item header__navbar__item__submenu__item--padding">
                                                <div class="header__navbar__item__submenu__item__category">
                                                    <a href="">
                                                        <h5>Sports Shoes</h5>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="">Women</a>
                                                        </li>
                                                        <li>
                                                            <a href="./SportsShoes.html?page=men">Men</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Couple</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="header__navbar__item__submenu__item__category">
                                                    <a href="">
                                                        <h5>Women</h5>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="">Running Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Outdoors Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Walking Shoes</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="header__navbar__item__submenu__item__category">
                                                    <a href="">
                                                        <h5>Men</h5>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="">Football Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Cricket Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Badminton Shoes</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-xl-5 col-lg-5 col-md-12">
                                            <div class="header__navbar__item__submenu__item">
                                                <h5>Products Special</h5>
                                                <ul class="header__navbar__item__submenu__item__product-list">
                                                    <li class="header__navbar__item__submenu__item__product header__navbar__item--full-width d-flex">
                                                        <a href="" class="header__navbar__item__submenu__item__product__img d-block">
                                                            <img class="img-cover" src="./IMG/img-product-small-4.jpg" alt="Lunar Force Shoes">
                                                        </a>
                                                        <div class="header__navbar__item__submenu__item__product__info">
                                                            <a href="">
                                                                <h6>Lunar Force Shoes</h6>
                                                            </a>
                                                            <p>
                                                                <span class="price">&#36;98.50</span>
                                                                <span class="discount">(-10&#37;)</span>
                                                                <span class="price-discount">&#36;88.65</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li class="header__navbar__item__submenu__item__product header__navbar__item--full-width d-flex">
                                                        <a href="" class="header__navbar__item__submenu__item__product__img d-block">
                                                            <img class="img-cover" src="./IMG/img-product-small-3.jpg" alt="Saucony Ride Shoes">
                                                        </a>
                                                        <div class="header__navbar__item__submenu__item__product__info">
                                                            <a href="">
                                                                <h6>Saucony Ride Shoes</h6>
                                                            </a>
                                                            <p>
                                                                <span class="price">&#36;98.50</span>
                                                                <span class="discount">(-10&#37;)</span>
                                                                <span class="price-discount">&#36;88.65</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li class="header__navbar__item__submenu__item__product header__navbar__item--full-width d-flex">
                                                        <a href="" class="header__navbar__item__submenu__item__product__img d-block">
                                                            <img class="img-cover" src="./IMG/img-product-small-2.jpg" alt="Aero Power Shoes">
                                                        </a>
                                                        <div class="header__navbar__item__submenu__item__product__info">
                                                            <a href="">
                                                                <h6>Aero Power Shoes</h6>
                                                            </a>
                                                            <p>
                                                                <span class="price">&#36;98.50</span>
                                                                <span class="discount">(-10&#37;)</span>
                                                                <span class="price-discount">&#36;88.65</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li class="header__navbar__item__submenu__item__product header__navbar__item--full-width d-flex">
                                                        <a href="" class="header__navbar__item__submenu__item__product__img d-block">
                                                            <img class="img-cover" src="./IMG/img-product-small-1.jpg" alt="Slip On Shoes">
                                                        </a>
                                                        <div class="header__navbar__item__submenu__item__product__info">
                                                            <a href="">
                                                                <h6>Slip On Shoes</h6>
                                                            </a>
                                                            <p>
                                                                <span class="price">&#36;98.50</span>
                                                                <span class="discount">(-10&#37;)</span>
                                                                <span class="price-discount">&#36;88.65</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col col-xl-4 col-lg-4 col-md-12">
                                            <div class="header__navbar__item__submenu__item header__navbar__item__submenu__item--padding">
                                                <h5>About us</h5>
                                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                                <a href="" class="img">
                                                    <img class="img-cover" src="./IMG/banner-menu.jpg" alt="Banner Image">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="header__navbar__item header__navbar__item--women full-width header__navbar__item--no-position">
                                <a href="./SportsShoes.html?page=women" class="header__navbar__link">
                                    Women
                                    <i class="hidden-medium fas fa-angle-down"></i>
                                    <span class="header__navbar__item__note header__navbar__item__note--sale">Sale</span>
                                    <span class="header__navbar__link__icon-mobile show-medium">
                                        <i class="plus fas fa-plus"></i>
                                        <i class="minus fas fa-minus"></i>
                                    </span>
                                </a>
                                <div class="header__navbar__item__submenu header__navbar__item__submenu--full-width">
                                    <div class="row">
                                        <div class="col col-xl-3 col-lg-3 col-md-12">
                                            <div class="header__navbar__item__submenu__item header__navbar__item__submenu__item--padding">
                                                <div class="header__navbar__item__submenu__item__category">
                                                    <a href="">
                                                        <h5>Sport Shoes</h5>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="">Tennis Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Boxing Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Trail Running Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Basketball Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Hiking Footwear</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Gym Shoes</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-xl-3 col-lg-3 col-md-12">
                                            <div class="header__navbar__item__submenu__item">
                                                <div class="header__navbar__item__submenu__item__category">
                                                    <a href="">
                                                        <h5>Fashion Shoes</h5>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="">Fashion Sandals</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Pumps & Peeptoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Ballet Flats</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Formal Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Casual Shoes</a>
                                                        </li>
                                                        <li>
                                                            <a href="">Workwear Shoes</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-xl-6 col-lg-6 col-md-12">
                                            <div class="header__navbar__item__submenu__item header__navbar__item__submenu__item--padding">
                                                <div class="header__navbar__item__submenu__item__women-products">
                                                    <div class="header__navbar__item__submenu__item__women-product">
                                                        <a href="" class="header__navbar__item__submenu__item__women-product__img d-block">
                                                            <img class="img-cover" src="./IMG/banner-menu-1.jpg" alt="Training shoes">
                                                        </a>
                                                        <a href="" class="header__navbar__item__submenu__item__women-product__title d-block">
                                                            <h5>Training shoes</h5>
                                                        </a>
                                                    </div>
                                                    <div class="header__navbar__item__submenu__item__women-product">
                                                        <a href="" class="header__navbar__item__submenu__item__women-product__img d-block">
                                                            <img class="img-cover" src="./IMG/banner-menu-2.jpg" alt="Running shoes">
                                                        </a>
                                                        <a href="" class="header__navbar__item__submenu__item__women-product__title d-block">
                                                            <h5>Running shoes</h5>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="header__navbar__item header__navbar__item--site-map full-width header__navbar__item--no-position">
                                <a href="./SiteMap.html" class="hidden-medium header__navbar__link">
                                    Site map
                                    <span class="header__navbar__item__note header__navbar__item__note--new">New</span>
                                </a>
                            </li>
                        </ul>

                        <ul class="header__navbar__list full-width header__navbar__list--right">
                            <li class="header__navbar__item header__navbar__item--member full-width">
                                <a href="./MemberPage.html" class="header__navbar__link">
                                    Member
                                </a>
                            </li>
                            <li class="header__navbar__item header__navbar__item--product full-width">
                                <a href="./SportsShoes.html" class="header__navbar__link">
                                    Product
                                    <i class="hidden-medium fas fa-angle-down"></i>
                                    <span class="header__navbar__link__icon-mobile show-medium">
                                        <i class="plus fas fa-plus"></i>
                                        <i class="minus fas fa-minus"></i>
                                    </span>
                                </a>
                                <ul class="header__navbar__item__submenu">
                                    <li class="header__navbar__item full-width__subitem">
                                        <a href="" class="header__navbar__item__sub-link">Detail thumbs at left</a>
                                    </li>
                                    <li class="header__navbar__item full-width__subitem">
                                        <a href="" class="header__navbar__item__sub-link">Detail thumbs at right</a>
                                    </li>
                                    <li class="header__navbar__item full-width__subitem">
                                        <a href="" class="header__navbar__item__sub-link">
                                            Detail no thumbs
                                            <i class="fas fa-angle-down hidden-medium"></i>
                                            <span class="header__navbar__link__icon-mobile show-medium">
                                                <i class="plus fas fa-plus"></i>
                                                <i class="minus fas fa-minus"></i>
                                            </span>
                                        </a>
                                        <ul class="header__navbar__item__submenu">
                                            <li class="header__navbar__item full-width__subitem">
                                                <a href="" class="header__navbar__item__sub-link">Detail no thumbs center</a>
                                            </li>
                                            <li class="header__navbar__item full-width__subitem">
                                                <a href="" class="header__navbar__item__sub-link">Detail no thumbs fullwidth</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="header__navbar__item full-width__subitem">
                                        <a href="" class="header__navbar__item__sub-link">Detail image gallery</a>
                                    </li>
                                    <li class="header__navbar__item full-width__subitem">
                                        <a href="" class="header__navbar__item__sub-link">Detail thumbs at bottom</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="header__navbar__item header__navbar__item--contact full-width">
                                <a href="./ContactPage.html" class="header__navbar__link">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
`;

const overlay = document.createElement('div');
overlay.classList.add('modal__overlay');
header.after(overlay);