import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value 2')
    })
  })
])
  .then((values) => {
    console.log(values)
    renderCheckoutHeader()
    renderOrderSummary()
    renderPaymentSummary()
  })

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value 1')
//   })

// }).then((value) => {
//   console.log(value)

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve()
//     })
//   })

// }).then(() => {
//   renderCheckoutHeader()
//   renderOrderSummary()
//   renderPaymentSummary()
// })

// loadProducts(() => {
//   loadCart(() => {
//     renderCheckoutHeader()
//     renderOrderSummary()
//     renderPaymentSummary()
//   })
// })
