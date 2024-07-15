export const cart = [];

export function addtocart(productId) {
  let matchingitem;

  // to check the the product is exits or not
  cart.forEach((cartitem) => {
    if (cartitem.productId === productId) {
      matchingitem = cartitem;
    }
  });

  // y means if item found it always incremenet
  if (matchingitem) {
    matchingitem.quantity += 1;
  }

  // if not set to i
  else {
    //push to the cart
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}
