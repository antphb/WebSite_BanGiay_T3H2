const sectionElement = document.querySelector("section");

let arrDataStorage = JSON.parse(localStorage.getItem("TTTHH-CART-KEY")) ?? [];

const getPriceProduct = product => product.discount ? product.price * (100 - product.discount) / 100 : product.price;


sectionElement.innerHTML = `<div class="container">
<div class="row no-gutters content__box">
    <div class="col col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 shopping__cart">
        <div class="shopping__cart__child">
            <h1 class="shopping__cart__content">Shopping Cart</h1>
            ${arrDataStorage.map(value => `
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
                        <div class="row no-gutters align-items-center">
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
                </div>
            `).join("")}
        </div>

        <a class="goto__shopping-btn" href="./index.html">CONTINUE SHOPPING</a>
        <a class="goto__shopping-btn" href="" id="myBtn" data-toggle="modal" data-target="#myModal">Order</a>

        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="text-center modal-title  font-weight-bold ">Ordering Information</h1>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form action="">
                            <div class="form-group">
                                <h2 class="text-center">Delivery Address</h2>
                                <div id="thongbao" class="text-center text-danger">
                                </div>
                            </div>
                            <div class="form-froup">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <input type="text" name="" id="txtht" class="form-control" required placeholder="Full Name">
                                        <span id="tbht" class="text-danger">(*)</span>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" name="" id="txtsdt" class="form-control" required placeholder="Number phone">
                                        <span id="tbsdt" class="text-danger">(*)</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-froup">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <select name="tp" id="txttp" class="col-sm-12 form-control">
                                        </select>
                                        <span id="tbtp" class="text-danger">(*)</span>
                                    </div>
                                    <div class="col-sm-6">
                                        <select name="quan" id="txtquan" class="col-sm-12 form-control">
                                        </select>
                                        <span id="tbquan" class="text-danger">(*)</span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-froup">
                                <input type="text" name="" id="txtDiaChi" class="form-control" required placeholder="14 Nguyen Van Bao Phuong 2">
                                <span id="tbDiaChi" class="text-danger">(*)</span>
                            </div>

                            <div class="form-froup">
                                <textarea class="form-control" name="" id="" cols="215" rows="5" placeholder="Note"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <h2 class="text-center mt-2">Product Information</h2>
                            </div>

                            <div class="shopping__cart__child">
                                <div class="row">
                                    <div class="col-4">
                                        <h3 class="text-center">Product name</h3>
                                    </div>
                                    <div class="col-4">
                                        <h3 class="text-center">Quantity</h3>
                                    </div>
                                    <div class="col-4" class="">
                                        <h3>Price</h3>
                                    </div>
                                </div>    

                                ${arrDataStorage.map((value)=>`
                                <div class="row no-gutters shopping__cart__child__box">
                                    <div class="col col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                        <img class="shopping__cart__product-img" src="IMG/${value.image}" alt="${value.name}">
                                    </div>
                                    <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <p class="shopping__cart__product-name">${value.name}</p>
                                        
                                        <p class="shopping__cart__new-price">$${getPriceProduct(value).toFixed(2)}</p>
                                        <p class="shopping__cart__option">Size: <span class="shopping__cart__size-type">${value.size[0]}</span></p>
                                        <p class="shopping__cart__option">Color: <span class="shopping__cart__color-type">${value.color[0]}</span></p>
                                    </div>
                                    <div class="col col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                        <div class="row no-gutters">
                                            <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                <div class="box__input-quantity">
                                                    <p class="col col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 shopping__cart__product__price-total">
                                                        ${value.number}
                                                    </p>
                                                </div>
                                            </div>
                                            <p class="col col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 shopping__cart__product__price-total">
                                                $${(getPriceProduct(value)*value.number).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>`).join("")}

                            </div>
                            <div class="form-group">
                                <h1 class="text-right mt-3">Total (tax excl.): $${arrDataStorage.reduce((before, after)=>{
                                    return before + (getPriceProduct(after)*after.number)
                                }, 0).toFixed(2)}</h1>
                                
                            </div>
                            <button type="button" id="btnSave" class="btn btn-outline-success btn-lg btn-block">Order</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-outline-dark" data-dismiss="modal">Close</button> 
                    </div>
                </div>
            </div>
        </div>
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
    elem.addEventListener("click", ()=>handleUpDownQty(elem, 1))
})
arrBtnDownQty.forEach((elem, index)=>{
    elem.addEventListener("click", ()=>handleUpDownQty(elem, -1))
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


$(document).ready(function(){
    
    $('#myModal').on('hidden.bs.modal', function () {
        location.reload();
    })

    const thanhpho = ["H??? Ch?? Minh", "H?? N???i"];

    const quanhcm=["Qu???n B??nh T??n","Qu???n B??nh Th???nh","Qu???n G?? V???p", "Qu???n Ph?? Nhu???n","Qu???n T??n B??nh","Qu???n T??n Ph??","Qu???n Th??? ?????c","Huy???n B??nh Ch??nh","Huy???n C???n Gi???","Huy???n C??? Chi","Huy???n H??c M??n","Huy???n Nh?? B??"]

    for (let i=1; i<13;i++)
    {
        quanhcm.push("Qu???n "+i)
    }
    quanhcm.sort()

    const quanhn=["Qu???n Ho??n Ki???m", "Qu???n Ba ????nh","Qu???n Hai B?? Tr??ng","Qu???n T??y H???","Qu???n ?????ng ??a","Qu???n C???u Gi???y","Qu???n Long Bi??n","Qu???n Ho??ng Mai","Qu???n H?? ????ng","Qu???n Thanh Xu??n","Qu???n B???c T??? Li??m","Qu???n Nam T??? Li??m"]
    quanhn.sort()

    let texttp = "<option value=''selected>City</option>";
    for (let i = 0; i < thanhpho.length; i++) {
        texttp += "<option value="+'"'+thanhpho[i]+'"'+">"+thanhpho[i]+"</option>";
    }
    $("#txttp").html(texttp)

    function kiemtrahoten()
    {
        var re=/^[A-Z][a-zA-Z]{1,}(?: [A-Z][a-zA-Z]*){0,2}$/
        var hoten=$("#txtht").val()
        if (hoten.trim()=="")
        {
            $("#tbht").html("*B???t bu???c nh???p")
            return false
        }
        if (!re.test(hoten))
        {
            $("#tbht").html("*Vi???t hoa ch??? c??i ?????u ti??n c???a t??? ch??? v?? m???i t??? 2 k?? t??? tr??? l??n")
            return false
        }
        $("#tbht").html("(*)")
        return true
    }
    $("#txtht").blur(kiemtrahoten)

    function kiemtrasdt()
    {
        var re=/^((0[3|5|7|8|9])+([0-9]{8})|(\+84)+\d{9})$/
        var sdt=$("#txtsdt").val()
        if (sdt.trim()=="")
        {
            $("#tbsdt").html("(*)B???t bu???c nh???p")
            return false
        }
        if (!re.test(sdt))
        {
            $("#tbsdt").html("(*)B???t ?????u t??? +84 ho???c 03, 05, 07, 08, 09 v?? ph???i ????? 10 s???")
            return false
        }
        $("#tbsdt").html("(*)")
        return true
    }
    $("#txtsdt").blur(kiemtrasdt)

    function kiemtradiachi()
    {
        var re=/^\d+\s[A-z]+\s[A-z]+/
        var diachi=$("#txtDiaChi").val()
        if (diachi.trim()=="")
        {
            $("#tbDiaChi").html("(*)B???t bu???c nh???p")
            return false
        }
        if (!re.test(diachi))
        {
            $("#tbDiaChi").html("S??? nh?? t??n ???????ng x??")
            return false
        }
        $("#tbDiaChi").html("(*)")
        return true
    }
    $("#txtDiaChi").blur(kiemtradiachi)

    function kiemtratp() {
        var tp=$("#txttp").val()
        // alert(tp=="")
        if (tp=="")
        {
            $("#tbtp").html("(*)B???t bu???c ch???n")
            return false
        }
        $("#tbtp").html("(*)")
        return true
    }
    $("#txttp").click(kiemtratp)

    function kiemtraquan() {
        var quan=$("#txtquan").val()
        var tp=$("#txttp").val()
        var textquan="";
        $("#txtquan").html(textquan)
        if (quan=="")
        {
            $("#tbquan").html("(*)B???t bu???c ch???n")
            return false
        }

        if (tp=="H??? Ch?? Minh")
        {
            for (let i = 0; i < quanhcm.length; i++) {
                textquan += "<option value="+'"'+quanhcm[i]+'"'+">"+quanhcm[i]+"</option>";
            }
        }

        if (tp=="H?? N???i")
        {
            for (let i = 0; i < quanhn.length; i++) {
                textquan += "<option value="+'"'+quanhn[i]+'"'+">"+quanhn[i]+"</option>";
            }
        }
        $("#txtquan").html(textquan)
        $("#tbquan").html("(*)")
        return true
    }
    $("#txttp").change(kiemtraquan)

    $("#btnSave").click(function()
    {
        if (arrDataStorage.length==0)
        {
            toast({title: 'Thi???u d??? li???u', message: "Gi??? h??ng r???ng", type: 'warning', duration: 5000})
            return false;
        }

        if (kiemtrahoten()==false || kiemtrasdt()==false || kiemtradiachi()==false || kiemtratp()==false || kiemtraquan()==false)
        {
            // $("#thongbao").html("(*)M???i b???n nh???p ????ng v?? ?????y ????? th??ng tin")
            toast({title: 'Thi???u d??? li???u', message: 'M???i b???n nh???p ????ng v?? ?????y ????? th??ng tin', type: 'warning', duration: 5000})
            return false;
        }

        $("#myModal").modal("hide");
        toast({title: 'Th??nh c??ng', message: 'Order Successfully', type: 'success', duration: 5000})
        localStorage.removeItem("TTTHH-CART-KEY");
        return true;
    })
})

