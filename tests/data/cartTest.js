import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

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
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })

    loadFromStorage()

    addToCart(productId)
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual(productId)
    expect(cart[0].quantity).toEqual(2)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId,
      quantity: 2,
      deliveryOptionId: '1'
    }]))
  })

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    })

    loadFromStorage()

    addToCart(productId)
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual(productId)
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    }]))
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
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })

    loadFromStorage()

    removeFromCart(productId1)
    expect(cart.length).toEqual(0)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]))
  })

  it('removes a product that is not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })

    loadFromStorage()

    removeFromCart(productId1)
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual(productId2)
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '1'
    }]))

  })
})

describe("test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })
  })

  it('updates the delivery option', () => {
    loadFromStorage()

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3')
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(1)
    expect(cart[0].deliveryOptionId).toEqual('3')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '3'
    }]))
  })

  it('update the delivery option of a product that is not in the cart', () => {
    loadFromStorage()

    updateDeliveryOption('Acapulco', '3')
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(1)
    expect(cart[0].deliveryOptionId).toEqual('1')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })

  it('update the delivery option that does not exist', () => {
    loadFromStorage()

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '5')
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(1)
    expect(cart[0].deliveryOptionId).toEqual('1')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
})