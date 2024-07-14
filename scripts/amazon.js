
// to combine the html to webpage
let productHTML = ''

// loop through the array
products.forEach((product) => {

  // used to convert the vaus as the image
  const ratingStars = product.rating.stars * 10;

  productHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${ratingStars}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      
      <div class="product-price">
        ${(product.priceCents / 100).toFixed(2)}  
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}" >
      
        Add to Cart
      </button>
    </div>
  `;

});

// why outside the loop becoz efficient
document.querySelector(".js-grid-product").innerHTML = productHTML;


document.querySelectorAll(".js-add-to-cart")
  .forEach((button) => {
    button.addEventListener("click",()=>{
      
      // to get the name of the prouct
      const productId =  button.dataset.productId;

      let matchingitem;

      // to check the the product is exits or not
      cart.forEach((item)=>{
        if(item.productId === productId){
          matchingitem = item;


        }

      });

      // y means if item found it always incremenet
      if(matchingitem)
      {
        matchingitem.quantity +=1;

      }

      // if not set to i
      else{
        //push to the cart
        cart.push({
          productId: productId,
          quantity: 1,
        });
      }

      // too store the quantity
      let cartquatity = 0;
      cart.forEach((item)=>{

        cartquatity += item.quantity;

      });

      // to show the quantity in the div elemnt
      document.querySelector(".js-cart-quantity").innerHTML = cartquatity;

  });
});


