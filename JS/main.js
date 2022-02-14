const backToTopBtn = $('.back-to-top');
const app = $('.app');
const navbarBtn = $('.header__navbar__menu-btn');
const navbarElement = $('.header__navbar__container');
const navbarModal = $('.header__navbar__modal');
const navbarModalOverlay = $('.modal__overlay');
const closeNavbarBtn = $('.header__navbar__close-menu');
const submenuBtn = $('.header__navbar__link__icon-mobile');
const headerNavbarItems = $('.header__navbar__item');
const headerNavbarContainer = $('.header__navbar__container');
const submenuFooterBtn = $('.footer__navbar__title');

// * Start Handler Show/Hidden Back to to btn

(() => {
    backToTopBtn.fadeOut(400, "linear");

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        scrollTop >= 150 
            ? backToTopBtn.fadeIn(400, "linear")
            : backToTopBtn.fadeOut(400, "linear");
    });
})();

// * End Handler Show/Hidden Back to to btn

// * Start Handler Event Click Back to top

(() => {
    backToTopBtn.click(() => {
        document.documentElement.scrollTop = 0;
    })
})();

// * End Handler Event Click Back to top

// * Start Handler Open/Close Navbar

(() => {
    function handlerOpenCloseNavbar(e) {
        navbarElement.toggleClass('open');
        navbarModal.toggleClass('open');
        app.toggleClass('open-menu');
        navbarModalOverlay.toggleClass('open');
        e.stopPropagation();
    }
    
    navbarBtn.click(handlerOpenCloseNavbar);
    closeNavbarBtn.click(handlerOpenCloseNavbar);
    navbarModal.click(handlerOpenCloseNavbar);
})();

// * End Handler Open/Close Navbar

// * Start Handler Open/Close Submenu Mobile

(() => {
    let temp;

    jQuery.fn.animateAuto = function(prop, speed, callback, parentEle, isShow){
        var elem, height, width;
        this.each(function(i, el){

            el = jQuery(el), elem = el.clone().css({
                "width": `${el[0].offsetWidth}px`,
                "height":"100%"
            }).appendTo("body");
            height = elem.css("height"),
            width = elem.css("width"),
            elem.remove();

            el.animate({"height":height}, speed, "linear", callback);
        });
        return height;
    }    

    submenuBtn.click(function(e) {

        e.preventDefault();
        e.stopPropagation();

        const isSubmenuOfSubmenu = $(this.parentElement)
            .hasClass('header__navbar__item__sub-link');

        if (isSubmenuOfSubmenu) {
            const parentElement = $(this).parent().parent();
            const submenuParentElement = $('.header__navbar__item.open > .header__navbar__item__submenu');
            const getListOfSubmenu = parentElement
                .children('.header__navbar__item__submenu');

            if (parentElement.hasClass('open')) {
                submenuParentElement.animate({
                    "height": `-=${temp}`
                }, 00, "linear");
                getListOfSubmenu.animate({"height": "0"}, 100, "linear");
            } else {
                temp = getListOfSubmenu.animateAuto("height", 100);
                submenuParentElement.animate({
                    "height": `+=${temp}`
                }, 100, "linear")
            }
            parentElement.toggleClass('open');
        } else {
            const headerNavbarItem = jQuery(this.offsetParent);
            const isShowSubmenu = headerNavbarItem.hasClass('open');
            const getSubmenuInSubmenu = jQuery(this.offsetParent)
                .children('.header__navbar__item__submenu')
                .children('.header__navbar__item')
                .children('.header__navbar__item__submenu');
    
            isShowSubmenu || headerNavbarItems.removeClass('open');
            headerNavbarItem.toggleClass('open');
            $('.header__navbar__item .header__navbar__item__submenu')
                .animate({"height": 0});
            isShowSubmenu 
                || $('.header__navbar__item.open > .header__navbar__item__submenu')
                    .animateAuto("height", 100);
            getSubmenuInSubmenu.css({"height": "0"});
        }
    })

    submenuFooterBtn.click(function(e) {
        if (window.innerWidth > 768) 
            return;

        const containerElement = $(this).parent();
        const submenuElement = containerElement.children('.footer__navbar__list');
        containerElement.toggleClass('open');

        containerElement.hasClass('open')
            && submenuElement.animateAuto("height", 300)
            || submenuElement.animate({"height": "0"});
    })
})();

// * End Handler Open/Close Submenu Mobile

// * Start Handler Click Header Navbar

headerNavbarContainer.click(e => e.stopPropagation());

// * End Handler Click Header Navbar