const footer = document.querySelector('footer');

footer.classList.add('footer');
footer.innerHTML = `
    <nav class="footer__navbar">
        <div class="container">
            <div class="row no-gutters">
                <div class="col col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <a href="/" class="footer__navbar__logo">
                        <img src="./IMG/logo3.png" alt="TTTHH" class="img-cover">
                    </a>
                </div>
                <div class="col col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12">
                    <div class="footer__navbar_container">
                        <h4 class="footer__navbar__title">
                            Account
                            <span class="footer__navbar__title__icon hidden-medium show-small">
                                <i class="plus fas fa-plus-circle"></i>
                                <i class="minus fas fa-minus-circle"></i>
                            </span>
                        </h4>
                        <ul class="footer__navbar__list">
                            <li class="footer__navbar__item">
                                <a href="Login.html" class="footer__navbar__link">LOGIN</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="MyAccount.html" class="footer__navbar__link">MY ACCOUNT</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="" class="footer__navbar__link">ADDRESSES</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="" class="footer__navbar__link">ORDERS HISTORY</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="" class="footer__navbar__link">OUR STORES</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12">
                    <div class="footer__navbar_container">
                        <h4 class="footer__navbar__title">
                            About us
                            <span class="footer__navbar__title__icon hidden-medium show-small">
                                <i class="plus fas fa-plus-circle"></i>
                                <i class="minus fas fa-minus-circle"></i>
                            </span>
                        </h4>
                        <ul class="footer__navbar__list">
                            <li class="footer__navbar__item">
                                <a href="" class="footer__navbar__link">PRICES DROP</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="" class="footer__navbar__link">NEW PRODUCTS</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="" class="footer__navbar__link">BEST SELLER</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="SiteMap.html" class="footer__navbar__link">SITEMAP</a>
                            </li>
                            <li class="footer__navbar__item">
                                <a href="" class="footer__navbar__link">PRIVACY</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12">
                    <div class="footer__navbar_container">
                    <h4 class="footer__navbar__title">
                        INFOMATIONS
                        <span class="footer__navbar__title__icon hidden-medium show-small">
                            <i class="plus fas fa-plus-circle"></i>
                            <i class="minus fas fa-minus-circle"></i>
                        </span>
                    </h4>
                    <ul class="footer__navbar__list">
                        <li class="footer__navbar__item">
                            <a href="" class="footer__navbar__link">PAYMENT</a>
                        </li>
                        <li class="footer__navbar__item">
                            <a href="" class="footer__navbar__link">DELIVERY</a>
                        </li>
                        <li class="footer__navbar__item">
                            <a href="" class="footer__navbar__link">SHIPPING</a>
                        </li>
                        <li class="footer__navbar__item">
                            <a href="" class="footer__navbar__link">REVOCATION</a>
                        </li>
                        <li class="footer__navbar__item">
                            <a href="" class="footer__navbar__link">ABOUT US</a>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="footer__end">
        <div class="container">
            <div class="row no-gutters">
                <div class="footer__end__list">
                    <div class="footer__end__item">
                        &copy;Copyright 2019. All right Reserved. Designed by Prestashop
                    </div>
                    <div class="footer__end__item">
                        <a href="" class="footer__end__img">
                            <img src="./IMG/footer-payment.png" alt="Image Payment Footer" class="img-contain">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
