import { cart, removecart } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryoption } from "../data/deliveroption.js";

const today = dayjs();
const delivarydate = today.add(7, "days");

console.log(delivarydate.format("dddd, MMMM D"));

let cartsummary = "";

// Function to generate delivery options HTML
function deliveryoptionhtml(productId, cartitem) {
  let html = "";
  deliveryoption.forEach((option) => {
    const deliverydate = today.add(option.deliverydays, "days");
    const datestr = deliverydate.format("dddd, MMMM D");

    const pricestr =
      option.priceCents === 0
        ? "Free"
        : `$${(option.priceCents / 100).toFixed(2)} - Shipping`;

    const ischecked = option.id === cartitem.deliveryoption;

    html += `
      <div class="delivery-option">
        <input type="radio"
          ${ischecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            ${datestr}
          </div>
          <div class="delivery-option-price">
            ${pricestr}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

// Loop through the cart items
cart.forEach((cartitem) => {
  const productId = cartitem.productId;
  let matchinproduct;

  // Find the matching product
  products.forEach((product) => {
    if (product.id === productId) {
      matchinproduct = product;
    }
  });

  // Generate cart item summary
  cartsummary += `
    <div class="cart-item-container js-cart-item-container${matchinproduct.id}">
      <div class="delivery-date">
        Delivery date: ${delivarydate.format("dddd, MMMM D")}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchinproduct.image}">
        <div class="cart-item-details">
          <div class="product-name">${matchinproduct.name}</div>
          <div class="product-price">${(
            matchinproduct.priceCents / 100
          ).toFixed(2)}</div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${
              cartitem.quantity
            }</span></span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchinproduct.id
            }">Delete</span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${deliveryoptionhtml(matchinproduct.id, cartitem)}
        </div>
      </div>
    </div>
  `;
});

// Insert the cart summary into the DOM
document.querySelector(".order-summary").innerHTML = cartsummary;

// Add event listeners to delete buttons
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    // Remove the item from the cart
    removecart(productId);
    console.log(cart);

    // Remove the item from the DOM
    const container = document.querySelector(
      `.js-cart-item-container${productId}`
    );
    if (container) {
      container.remove();
    }
  });
});
