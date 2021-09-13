const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;

    // making title smaller if product.title.length > 40
    let titleToSmaller, titleToBigger;
    if (product.title.length > 40) {
      titleToSmaller = product.title;
      titleToBigger = '';
    } else {
      titleToBigger = product.title;
      titleToSmaller = '';
    }
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML =
      `<div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h3>${titleToBigger}</h3>
        <h4>${titleToSmaller}</h4>
        <p>Category: ${product.category}</p>
        <h3>Price: $ ${product.price}</h3>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
        <button id="details-btn" class="btn btn-info" onclick="showDetailsModal(${product.id})">Details</button>
        <p>Average Rating ${product.rating.rate}</p>
        <p>Rated by ${product.rating.count} person</p>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  let converted;
  if (id == 'price') {
    converted = parseFloat(element);
  } else {
    converted = parseInt(element);
  }
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  let total = (convertedOldPrice + convertPrice);
  total = parseFloat(total.toFixed(2));
  document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};


// get details form API basing on product id
const showDetailsModal = id => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showModal(data));

}

// console log a single product by id
const showModal = data => {
  console.log(data.category);
}

