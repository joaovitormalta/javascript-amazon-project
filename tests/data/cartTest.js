import { cart } from "../../data/cart-class.js";

describe("test suite: addToCart", () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'

  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    document.querySelector('.js-test-container')
      .innerHTML = `
      <select class="js-quantity-selector-${productId}">
        <option selected value="1">1</option>
        <option value="2">2</option>
      </select>
    `
  })

  afterEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = ''
  })

  it('adds an existing product to the cart', () => {
    cart.cartItems = [{
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    }]


    cart.addToCart(productId)
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart.cartItems[0].productId).toEqual(productId)
    expect(cart.cartItems[0].quantity).toEqual(2)
  })

  it('adds a new product to the cart', () => {
    cart.cartItems = []

    cart.addToCart(productId)
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart.cartItems[0].productId).toEqual(productId)
    expect(cart.cartItems[0].quantity).toEqual(1)
  })
})

describe("test suite: removeFromCart", () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  beforeEach(() => {
    spyOn(localStorage, 'setItem')
  })

  afterEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = ''
  })

  it('removes a product that is in the cart', () => {
    cart.cartItems = [{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '1'
    }]

    cart.removeFromCart(productId1)
    expect(cart.cartItems.length).toEqual(0)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
  })

  it('removes a product that is not in the cart', () => {
    cart.cartItems = [{
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '1'
    }]

    cart.removeFromCart(productId1)
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart.cartItems[0].productId).toEqual(productId2)
    expect(cart.cartItems[0].quantity).toEqual(1)
  })
})

describe("test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]
  })

  it('updates the delivery option', () => {

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3')
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
  })

  it('update the delivery option of a product that is not in the cart', () => {

    cart.updateDeliveryOption('Acapulco', '3')
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })

  it('update the delivery option that does not exist', () => {

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '5')
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
})