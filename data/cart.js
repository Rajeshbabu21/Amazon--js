export let cart =  [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryoptioid: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryoptioid: "2",
  },
];

function savetolocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.dispatchEvent(new Event("cartUpdated"));
}

export function addtocart(productId, deliveryoptioid) {
  let matchingitem;

  cart.forEach((cartitem) => {
    if (cartitem.productId === productId) {
      matchingitem = cartitem;
    }
  });

  if (matchingitem) {
    matchingitem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryoptioid: "1",
    });
  }
  savetolocal();
}

export function removecart(productId) {
  cart = cart.filter((cartitem) => cartitem.productId !== productId);
  savetolocal();
}
