import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })

    const productContainer = document.createElement('div')
    productContainer.className = 'product-container'
    
    const quantitySelector = document.createElement('select')
    quantitySelector.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    quantitySelector.innerHTML = `
      <option value="1">1</option>
      <option value="2">2</option>
    `
    quantitySelector.value = '1'
    
    productContainer.appendChild(quantitySelector)
    document.body.appendChild(productContainer)

    loadFromStorage()

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(2)
  })

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    })

    const productContainer = document.createElement('div')
    productContainer.className = 'product-container'
    
    const quantitySelector = document.createElement('select')
    quantitySelector.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    quantitySelector.innerHTML = `
      <option value="1">1</option>
      <option value="2">2</option>
    `
    quantitySelector.value = '1'
    
    productContainer.appendChild(quantitySelector)
    document.body.appendChild(productContainer)

    loadFromStorage()

    const selector = document.querySelector('.js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(selector).not.toBeNull()
    expect(selector.value).toBe('1')

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(1)
  })
})