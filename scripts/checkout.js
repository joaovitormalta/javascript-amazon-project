import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = ''

cart.forEach((cartItem) => {
  const productId = cartItem.productId

  let matchingProduct

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product
    }
  })

  cartSummaryHTML += `
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
      src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-quantity-link js-save-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.classList.add('is-editing-quantity')
    })
  })

document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      saveQuantity(link)
    })
  })

document.querySelectorAll('.js-quantity-input')
  .forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const productId = input.dataset.productId
        const link = document.querySelector(`.js-save-quantity-link-${productId}`)
        saveQuantity(link)
      }
    })
  })

function saveQuantity(link) {
  const productId = link.dataset.productId

  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
  const quantity = Number(quantityInput.value)

  if (quantity < 0 || quantity >= 1000 || isNaN(quantity)) {
    alert('Quantity must be at least 0 and least than 1000')
    quantityInput.value = 1
    return
  }

  const container = document.querySelector(`.js-cart-item-container-${productId}`)
  container.classList.remove('is-editing-quantity')

  updateQuantity(productId, quantity)

  const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)
  quantityLabel.innerHTML = quantity

  updateCartQuantity()
}

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      removeFromCart(productId)

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.remove()

      updateCartQuantity()
    })
  })

function updateCartQuantity() {
  let cartQuantity = 0

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  })

  document.querySelector('.js-return-to-home')
    .innerHTML = `${cartQuantity} items`
}

updateCartQuantity()