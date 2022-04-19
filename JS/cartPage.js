const sectionElement = document.querySelector("section");

let arrDataStorage = JSON.parse(localStorage.getItem("TTTHH-CART-KEY")) ?? [];
console.log(arrDataStorage);

const getPriceProduct = product => product.discount ? product.price * (100 - product.discount) / 100 : product.price;


sectionElement.innerHTML = `<div class="container">
<div class="row no-gutters content__box">
    <div class="col col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 shopping__cart">
        <div class="shopping__cart__child">
            <h1 class="shopping__cart__content">Shopping Cart</h1>
            ${arrDataStorage.map((value, index)=>`
            <div class="row no-gutters shopping__cart__child__box">
                <div class="col col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                    <img class="shopping__cart__product-img" src="IMG/${value.image}" alt="${value.name}">
                </div>
                <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <p class="shopping__cart__product-name">${value.name}</p>
                    <p class="shopping__cart__old"><span class="shopping__cart__old-price ${value.discount || 'hidden'}">$${value.price.toFixed(2)}</span>
                    <span class="shopping__cart__percent-sales ${value.discount || 'hidden'}">(-${value.discount}%)</span></p>
                    <p class="shopping__cart__new-price">$${getPriceProduct(value).toFixed(2)}</p>
                    <p class="shopping__cart__option">Size: <span class="shopping__cart__size-type">${value.size[0]}</span></p>
                    <p class="shopping__cart__option">Color: <span class="shopping__cart__color-type">${value.color[0]}</span></p>
                </div>
                <div class="col col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                    <div class="row no-gutters">
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                            <div class="box__input-quantity">
                                <input type="text" id="shopping__cart__quantity-product" value="${value.number}">
                                <div class="group__control__quantity">
                                    <button class="btn__up__qty"><i class="fa-solid fa-angle-up"></i></button>
                                    <button class="btn__down__qty"><i class="fa-solid fa-angle-down"></i></button>
                                </div>
                            </div>
                        </div>
                        <p class="col col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 shopping__cart__product__price-total">
                            $${(getPriceProduct(value)*value.number).toFixed(2)}
                        </p>
                        <p class="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 shopping__cart__remove__product">
                            <i class="fa-solid fa-trash"></i>
                        </p>
                    </div>
                </div>
            </div>`).join("")}
            
            
        </div>
        <a class="goto__shopping-btn" href="./index.html">CONTINUE SHOPPING</a>
    </div>
    <div class="col col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 infomation__detail">
        <div>
            <div class="infomation__detail__box infomation__detail__subtotal">
                <div class="group__need__border-bottom">
                    <div class="group__need_border-bottom__flex">
                        <span class="infomation__detail__quantity-total">${arrDataStorage.reduce((before, after)=>{
                            return before + after.number;
                        },0)} items</span>
                        <span class="infomation__detail__money-total">$${(arrDataStorage.reduce((before, after)=>{
                                return before + ((getPriceProduct(after)*after.number))
                        }, 0)).toFixed(2)}</span>
                    </div>
                    <div class="group__need_border-bottom__flex">
                        <span>Shipping</span> 
                        <span class="infomation__detail__shipping-price">$0.00</span>
                    </div>
                </div>
                <div class="group__need__border-bottom">
                    <div class="group__need_border-bottom__flex">
                        <span>Total (tax excl.)</span> 
                        <span class="infomation__detail__money-total__andTax">$${arrDataStorage.reduce((before, after)=>{
                            return before + (getPriceProduct(after)*after.number)
                    }, 0).toFixed(2)}</span>
                    </div>
                    <div class="group__need_border-bottom__flex">
                        <span>Taxes</span> 
                    <span class="infomation__detail__tax">$${(0).toFixed(2)}</span>
                    </div>  
                </div>
                <div class="group__need_padding goto__checkout__box">
                    <a  class="goto__checkout" href="#">PROCEED TO CHECKOUT</a>
                </div>
            </div>
            <div class="infomation__detail__box infomation__detail__box__policy">
                <ul class="infomation__detail__list__policy">
                    <li class="group__need__border-bottom infomation__detail__item__policy">
                        <i class="icofont-shield"></i>
                        <span> Security policy (edit with Customer reassurance module)</span>
                    </li>
                    <li class="group__need__border-bottom infomation__detail__item__policy">
                        <i class="icofont-truck-alt"></i>
                        <span>Delivery policy (edit with Customer reassurance module)</span>
                    </li>
                    <li class="group__need_padding infomation__detail__item__policy">
                        <i class="icofont-exchange"></i>
                        <span>Return policy (edit with Customer reassurance module)</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</div>
</div>`


const arrBtnUpQty = document.querySelectorAll(".btn__up__qty");
const arrBtnDownQty = document.querySelectorAll(".btn__down__qty")

function getParentElement(elem, classParent){
    while (!elem.classList.contains(classParent)){
        elem = elem.parentElement;
    }
    return elem;
}
arrBtnUpQty.forEach((elem, index)=>{
    elem.addEventListener("click", ()=>{
        handleUpDownQty(elem, 1)

    })
})
arrBtnDownQty.forEach((elem, index)=>{
    elem.addEventListener("click", ()=>{
        handleUpDownQty(elem, -1);
    })
})
function handleUpDownQty(elem, number){
        let elemParent = getParentElement(elem, "shopping__cart__child__box");
        let elemInputQty = elemParent.querySelector("#shopping__cart__quantity-product");
        if (elemInputQty.value-0 <= '1' && number == -1){
            return;
        }
        elemInputQty.value = elemInputQty.value - 0 + number;
        let nameProduct = elemParent.querySelector(".shopping__cart__product-name").textContent;
        let elemTotalPriceOfProduct = elemParent.querySelector(".shopping__cart__product__price-total");
        
        arrDataStorage.forEach((elem, index) =>{
            if (elem.name === nameProduct){
                elem.number = elemInputQty.value-0;
                elemTotalPriceOfProduct.innerHTML = `$${(getPriceProduct(elem)*elem.number).toFixed(2)}`;
            }
        })
        localStorage.setItem("TTTHH-CART-KEY", JSON.stringify(arrDataStorage));
        re_render_detailProduct();
}
function re_render_detailProduct(){
    const elemDetailSubtotal = document.querySelector(".infomation__detail");
    elemDetailSubtotal.innerHTML = `<div>
    <div class="infomation__detail__box infomation__detail__subtotal">
        <div class="group__need__border-bottom">
            <div class="group__need_border-bottom__flex">
                <span class="infomation__detail__quantity-total">${arrDataStorage.reduce((before, after)=>{
                    return before + after.number;
                },0)} items</span>
                <span class="infomation__detail__money-total">$${(arrDataStorage.reduce((before, after)=>{
                        return before + (getPriceProduct(after)*after.number)
                }, 0)).toFixed(2)}</span>
            </div>
            <div class="group__need_border-bottom__flex">
                <span>Shipping</span> 
                <span class="infomation__detail__shipping-price">$0.00</span>
            </div>
           
        </div>
        <div class="group__need__border-bottom">
            <div class="group__need_border-bottom__flex">
                <span>Total (tax excl.)</span> 
                <span class="infomation__detail__money-total__andTax">$${(arrDataStorage.reduce((before, after)=>{
                    return before + (getPriceProduct(after)*after.number)
            }, 0)).toFixed(2)}</span>
            </div>
            <div class="group__need_border-bottom__flex">
                <span>Taxes</span> 
            <span class="infomation__detail__tax">$${(0).toFixed(2)}</span>
            </div>  
        </div>
        <div class="group__need_padding goto__checkout__box">
            <a  class="goto__checkout" href="#">PROCEED TO CHECKOUT</a>
        </div>
    </div>
    <div class="infomation__detail__box infomation__detail__box__policy">
        <ul class="infomation__detail__list__policy">
            <li class="group__need__border-bottom infomation__detail__item__policy">
                <i class="icofont-shield"></i>
                <span> Security policy (edit with Customer reassurance module)</span>
            </li>
            <li class="group__need__border-bottom infomation__detail__item__policy">
                <i class="icofont-truck-alt"></i>
                <span>Delivery policy (edit with Customer reassurance module)</span>
            </li>
            <li class="group__need_padding infomation__detail__item__policy">
                <i class="icofont-exchange"></i>
                <span>Return policy (edit with Customer reassurance module)</span>
            </li>
        </ul>
    </div>
</div>`
}

const arrBtnRemoveProduct = Array.from(document.querySelectorAll(".shopping__cart__remove__product"));
const arrInputQty = Array.from(document.querySelectorAll(".box__input-quantity > input"));

arrBtnRemoveProduct.forEach(function(elem){
    elem.addEventListener("click", function(){
        let parrentOfBtnRemove = getParentElement(elem, "shopping__cart__child__box");
        let nameProduct = parrentOfBtnRemove.querySelector(".shopping__cart__product-name").textContent;
        arrDataStorage.forEach((elem, index) =>{
            if (elem.name === nameProduct){
                arrDataStorage.splice(index, 1);
            }
        })
        parrentOfBtnRemove.remove();
        re_render_detailProduct();
        localStorage.setItem("TTTHH-CART-KEY", JSON.stringify(arrDataStorage));
    })
})
arrInputQty.forEach((elem, index)=>{
    elem.addEventListener("blur", ()=>{
        let parrentOfElem = getParentElement(elem, "shopping__cart__child__box");
        let nameProduct = parrentOfElem.querySelector(".shopping__cart__product-name").textContent;
        let elemTotalPriceOfProduct = parrentOfElem.querySelector(".shopping__cart__product__price-total");
        if (isNaN(elem.value) || elem.value -0 <= 0){
            elem.value = 1;
        }
        arrDataStorage.forEach((object) =>{
            if (object.name === nameProduct){
                object.number = elem.value-0;
                elemTotalPriceOfProduct.innerHTML = `$${(getPriceProduct(object)*object.number).toFixed(2)}`;
            }
        })
        re_render_detailProduct();
        localStorage.setItem("TTTHH-CART-KEY", JSON.stringify(arrDataStorage));
    })
})