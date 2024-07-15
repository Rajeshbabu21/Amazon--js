export let cart =

// to start the project
JSON.parse(localStorage.getItem("cart")); 

// idf empty
if(!cart)
{
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },

    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}



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

  savetolocalstotage();
}




// created new array not equal put the array

export function removecart(productId)
{
  const newcart = [];

  cart.forEach((cartitem)=>{
    if (cartitem.productId !== productId)
    {
      newcart.push(cartitem);
    }

    cart = newcart

    savetolocalstotage();


  });



}


// local storage

function savetolocalstotage()
{
  localStorage.setItem("cart",JSON.stringify(cart))

}
