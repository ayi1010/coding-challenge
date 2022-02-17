const products = [
    {
        id: 1,
        img: './img/newborn-set1.jpg',
        name: 'Newborn set 1',
        price: '$80'
    },
    {
        id: 2,
        img: './img/newborn-set2.jpg',
        name: 'Newborn set 2',
        price: '$100'
    },
    {
        id: 3,
        img: './img/newborn-set3.jpg',
        name: 'Newborn set 3',
        price: '$120'
    }
]

const cardList = products.map(function (product) {
    const createCard = `
            <div class="col">
        <div class="card h-100">
            <img src=${product.img} class="card-img-top" alt="white onesie for newborn">
            <div>
                <div class="card-body" id="cardSet${product.id}">
                    <h5 class="card-title" id="nameSet${product.id}">${product.name}</h5>
                    <p class="card-text" id="priceSet${product.id}">${product.price}</p>
                    <input type="number" name="set1" id="inputSet${product.id}">
                </div>
                <div class="card-footer">
                    <button class="btn btnSet" id="btnSet${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
            `
    return createCard
})
const cardListHtml = cardList.join('\n')
const cardProducts = document.querySelector('#cardProducts')
cardProducts.innerHTML = cardListHtml

// https://www.youtube.com/watch?v=YeFzkC2awTM
function removeCartItem() {
    const removeCartItemButtons = document.querySelectorAll('.btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i]
        button.addEventListener('click', function (e) {
            const buttonClicked = e.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
        })
    }
}

const totalValue = document.querySelector('#totalValue')
function updateCartTotal() {
    let total = 0;
    let item = document.getElementsByClassName('totalSet');
    for (let i = 0; i < item.length; i++) {
        total = total + Number(item[i].innerHTML)
    }
    totalValue.innerHTML = `$${total}`
}

const qtyInputs = document.querySelectorAll('input')
for (let i = 0; i < qtyInputs.length; i++) {
    const input = qtyInputs[i]
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(e) {
    const input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


const addCartButtons = document.querySelectorAll('.btnSet')
for (let i = 0; i < addCartButtons.length; i++) {
    const button = addCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}
//the callback function for event listener can't take any other parameter than 'event'?
function addToCartClicked(e) {
    const button = e.target
    const buttonClicked = button.parentElement.parentElement
    const name = buttonClicked.querySelector('div h5').innerText
    const qty = buttonClicked.querySelector('div input').value
    const priceString = buttonClicked.querySelector('div p').innerText
    const price = Number(priceString.replace('$', ''))
    addItemToCart(name, qty, price)
    updateCartTotal()
}


function addItemToCart(name, qty, price) {
    const cartRow = document.createElement('tr')
    const itemNames = document.querySelectorAll('.item-name')
    for (let i = 0; i < itemNames.length; i++) {
        const cartItemName = itemNames[i].innerText
        if (cartItemName === name) {
            alert('this item is already added!')
            return
        }
    }
    const cartContents = `<th scope="row" class="item-name">${name}</th>
    <td id="qtySet">${qty}</td>
    <td id="priceSet">${price}</td>
    <td class="totalSet">${qty * price}</td>
    <td><button class="btn btn-danger" type="button">Remove</button></td>`
    cartRow.innerHTML = cartContents
    const tableBody = document.querySelector('#tableBody')
    tableBody.append(cartRow)
    removeCartItem()
}




