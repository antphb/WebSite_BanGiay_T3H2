const elemBtnUpQuantity = document.querySelector("#option__color-list__up-quantity");
const elemInputQuantity = document.querySelector("#option__color-list__input-quantity");
const elemBtnDownQuantity = document.querySelector("#option__color-list__down-quantity");
const elemsLinkImageSlickSlide = document.querySelectorAll(".form-register-product__list__item__link");
const elemListBtnDesc = Array.from(document.querySelectorAll(".product__list__tab__link"));

function start(){
        
    elemBtnUpQuantity.addEventListener("click", ()=>{
    
        elemInputQuantity.value = elemInputQuantity.value - 0 + 1;
    })
    elemBtnDownQuantity.addEventListener("click", ()=>{
        if (elemInputQuantity.value - 0 > 1){
            elemInputQuantity.value -= 1;
        }
    })

    elemListBtnDesc.forEach((value)=>{
        value.addEventListener("click", (e)=>{
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
        
        responsive: [
            {
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
        ]
        ,
    })
    $("#zoom-id").elevateZoom({
        gallery: "thumb-image",
        cursor: "pointer",
        galleryActiveClass: "active",
        imageCrossfade: true,
        tint:true, tintColour:'rgba(0, 0, 0, 0.5)', tintOpacity:0.5,
        


    });
    $(".form-register-product-left__tool-zoom").bind("click", function(e){
        var ez =   $('#zoom-id').data('elevateZoom');	
    
        $.fancybox(ez.getGalleryList());
        console.log($(".fancybox-item.fancybox-close"))
        $(".fancybox-item.fancybox-close").html(`aaaaaaaaa`);
        return false;
    })
    $("#zoom-id").bind("click", function(e) {  
        var ez =   $('#zoom-id').data('elevateZoom');	
    
        $.fancybox(ez.getGalleryList());
        console.log($(".fancybox-item.fancybox-close"))
        $(".fancybox-item.fancybox-close").html(`aaaaaaaaa`);
        return false;
    });
    elemsLinkImageSlickSlide.forEach((value) =>{
        value.addEventListener("click", (e)=>{
            e.stopPropagation();
            e.preventDefault();
        })
    })  
}
start();

$(window).resize(function(){
    var w = $(window).width();
    if (w <= 575){
       
        window.location.reload(true);
        start();
        console.log("load mobile");
        return;
    }
    if (w <= 991){
        
        window.location.reload(true);
        start();
        console.log("load tablet");
        return;
    }
    if(w >= 1200) {
        
        window.location.reload(true);
        start();
       console.log("load pc");
       return;
    }
    

});