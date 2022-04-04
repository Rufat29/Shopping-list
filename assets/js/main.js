const card_container = document.querySelector('.card-container');
const cart = document.querySelector('.cart');
const remove_cart = document.querySelector('.remove-cart');

// COUNT WHEN ADDING CART
const setCart = () => {
    const basket = JSON.parse(localStorage.getItem("basket")) || []

    const elements = []
    let count = 0
    basket.map(item => {
        basket.map(item2 => {
            if (item === item2) {
                count++
            }
        })
        if (!elements.some(el => el.id === item)) {
            elements.push({
                id: item,
                count: count
            })
        }
        count = 0
    })


    let cart_element = ''
    let simpleCost
    let totalCost = 0
    elements.map(item => {
        const element = data.find(item2 => item2.id == item.id)
        simpleCost = (element.price * item.count)
        totalCost += simpleCost
        cart_element += `
        <div class="cart_element" id="${element.id}">
            <h3>${element?.title.slice(0, 20)}</h3>
            <p data-price="${item.count}"><span class="plus">+</span>${item.count}<span class="minus">-</span></p>
            <span class="cost">${simpleCost.toFixed(2)}</span>
        </div>`
    })

    cart.innerHTML = `
        <p class="cart-title">${basket.length} items in your cart </p>
        <p class="total-cost">Your total cost is ${totalCost.toFixed(2)}</p>
        ${cart_element}
    `
}


// SHOW-BASKET-ONLOAD
setCart()


// ADD-CARDS FROM DATA.JS
data.filter(item => item.stock != false)
    .forEach(element => card_container.innerHTML +=
        `<div class="card" id="${element.id}">
            <img class="card-img" src="${element.image}" alt="">
            <div class="card-content">
                <div class="content-header">
                    <h2>${element.title.slice(0, 20)}</h2>
                    <p>${element.price}</p>
                </div>
                <p class="card-text">${element.content.slice(0, 100)}</p>
            </div>
        </div>`);


// ADD-TO-BASKET
const cards = document.querySelectorAll('.card');

const addToBasket = (id) => {
    const data = JSON.parse(localStorage.getItem("basket")) || []
    data.push(id)
    localStorage.setItem("basket", JSON.stringify(data))
}

cards.forEach(element => {
    element.addEventListener('click', () => {
        addToBasket(element.id)
        setCart()
    })
})