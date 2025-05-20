import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
  try {
    // throw 'erro1'

    await loadProductsFetch()

    await new Promise((resolve, reject) => {
      // throw 'error2'
      loadCart(() => {
        // reject('error3')
        resolve()
      })
    })

  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }


  renderCheckoutHeader()
  renderOrderSummary()
  renderPaymentSummary()
}

loadPage()