document.addEventListener("DOMContentLoaded", () => {
    const url = "https://fakestoreapi.com/products"; //REST API's Endpoint

    //Select HTML DOM Elements:
    const productContainer = document.querySelector(".product-container");

    // 👇 Function to Show Limited No. of Words of a Text Content:
    const decreaseWordsOf = (textContent, numOfVisibleWords) => {
        return textContent.split(' ').slice(0, numOfVisibleWords).join(' ') + "...";
    }

    //👇 Function to Create Product-Card Element (containing Image, Title, Description and Price of Product):
    const createProductCardEl = (product) => {
        const productCardEl = document.createElement("div");
        productCardEl.classList.add("product-card");
        productCardEl.innerHTML = `<div class="img">
                                    <img src=${product.image} alt="Product Image" loading="lazy">
                                </div>

                                <div class="info">
                                    <h1>${product.title}</h1>
                                    <p>${decreaseWordsOf(product.description, 20)}</p>
                                    <button>$ ${product.price}</button>
                                </div>`;
        return productCardEl;
    }

    //👇 Function to Display Product-Card Element, by Appending it in the ".product-container":
    const displayProducts = (products) => {
        //Loop through the Fetched Products:
        products.forEach((product) => {
            const productCardEl = createProductCardEl(product);
            productContainer.appendChild(productCardEl);
        });
    }

    //👇 Function to Fetch Products from the "FakeStoreAPI":
    const fetchProducts = async () => {
        try {
            const resp = await axios.get(url);
            return resp.data; //Products in Array form
        }
        catch (err) {
            console.log(err);
        }
    }

    fetchProducts()
        .then((products) => {
            displayProducts(products);
        })
});