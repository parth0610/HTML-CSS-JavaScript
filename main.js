var finalQuantity = 0;
var finalPrice = 0;
const items = [];
let cartItems = [];


function addToCart(e) {

    var itemId = e.parentNode.querySelector('#itemId').value;
    var itemName = e.parentNode.querySelector('#itemName').value;
    var itemQuantity = parseInt(e.parentNode.querySelector('#qVal').value);
    var itemPrice = parseFloat(e.parentNode.querySelector('#itemPrice').value) * itemQuantity;
    var imagePath = e.parentNode.querySelector('#imagePath').value;

    finalQuantity += parseFloat(itemQuantity);
    finalPrice += parseFloat(itemPrice);

    items.push(itemName);
    

    cartOperaton(cartItems, itemId, itemName, itemQuantity, itemPrice,imagePath);

    updateCartInfo(cartItems);
}

function cartOperaton(cartItems, itemId, itemName, itemQuantity, itemPrice,imagePath) {

    const found = cartItems.some(el => el.id === itemId);
    if (!found) {
        let newCartItem = {};
        newCartItem.id = itemId;
        newCartItem.itemName = itemName;
        newCartItem.itemQuantity = itemQuantity;
        newCartItem.itemPrice = itemPrice;
        newCartItem.imagePath = imagePath;

        cartItems.push(newCartItem);
    } else {
        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id == itemId) {
                cartItems[i].itemQuantity = parseInt(itemQuantity);
                cartItems[i].itemPrice = itemPrice;
            }
        }
    }
}

function updateCartInfo(cartItems) {
    var innrHtml='<br><ul class="items">';
    var totalCartVal=0;
    for (var i = 0; i < cartItems.length; i++) {
        innrHtml +='<li> <div class="checkout-img-sec"><img src="./images/'+cartItems[i].imagePath+'.jpg" style="height: 100px; width:100px;" /></div>';
        innrHtml += '<br><br><p class="item-header">' + cartItems[i].itemName +'</p>'+''
                 +'<input type="hidden" id="itemId" name="itemId" value="'+cartItems[i].id+'" /></br>' +
                 '<p>' + parseInt(cartItems[i].itemPrice) / parseInt(cartItems[i].itemQuantity) + ' * ' +
                    cartItems[i].itemQuantity +'= '+ cartItems[i].itemPrice +'</p>'+
                ' <button id="btnRemove" class="btnRemove" onclick="removeFromCart('+cartItems[i].id+')"> Delete</button><br><li>';

            totalCartVal = parseFloat(totalCartVal) +  parseFloat(cartItems[i].itemPrice)
    }
    document.getElementById('finalCartInfo').innerHTML = "";
    document.getElementById('finalCartInfo').innerHTML = innrHtml + '</ul><br> <br><button style="width: 100%;"> <b><ul><li><span style="padding-left: 9%;button-color:red;"<mark>TotalCart: $</span> '+totalCartVal+'</li></ul></b></mark></button>';

    console.log(cartItems);
}

function removeFromCart(itemId ){
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id == itemId) {
            cartItems.splice(i, 1);
            break;
        }
    }
    updateCartInfo(cartItems);
}

