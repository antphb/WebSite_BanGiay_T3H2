var elementHeader = document.querySelector(".header");
var elementOpenModalNavbar =  elementHeader.querySelector(".header__navbar__show-more");
var elementIncludeModal = elementHeader.querySelector(".header__navbar__box");
var elementCloseModel = elementHeader.querySelector(".header__navbar__close-modal");
var elementBoxMenu = elementHeader.querySelector(".header__navbar__box--child");
var elementsItemInMenu = elementHeader.querySelectorAll(".header__navbar__item");

// modal__navbar__box
function start(){
    handleOpenCloseMenuMobile();
    handleShowMoreInfoItemInMenuMobile();
}
start();
function handleOpenCloseMenuMobile(){
   elementOpenModalNavbar.addEventListener("click", function(){
       elementIncludeModal.classList.toggle("modal__navbar__box");
   })
   elementCloseModel.addEventListener("click", function(){
        elementIncludeModal.classList.toggle("modal__navbar__box");
   })
   elementIncludeModal.addEventListener("click", function(){
        elementIncludeModal.classList.toggle("modal__navbar__box");
   })
   elementBoxMenu.addEventListener("click", function(e){
       e.stopPropagation();
   })
}
function handleShowMoreInfoItemInMenuMobile(){
    for (var i = 0; i < elementsItemInMenu.length; i++){
       var elementDivCloseOpen = elementsItemInMenu[i].querySelector(".header__navbar__icon__open-close");
       var elementInfoShowMore = elementsItemInMenu[i].querySelector(".header__navbar__about");
       if (elementInfoShowMore != null && elementDivCloseOpen != null){
            let temp = elementInfoShowMore;
           elementDivCloseOpen.addEventListener("click", function(){
                temp.classList.toggle("show");
                let tempBtnClose = this.querySelector(".header__navbar__icon--minus");
                let tempBtnOpen = this.querySelector(".header__navbar__icon--plus");
                if (temp.classList.contains("show")){
                    tempBtnClose.style.display = "inline";
                    tempBtnOpen.style.display = "none";
                } else {
                    tempBtnClose.style.display = "none";
                    tempBtnOpen.style.display = "inline";
                }
           })
           
       }
    }
}