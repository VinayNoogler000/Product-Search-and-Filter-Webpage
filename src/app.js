document.addEventListener("DOMContentLoaded", () => {
    const url = "https://fakestoreapi.com/products"; //REST API's Endpoint

    //Select HTML DOM Elements:
    const productContainer = document.querySelector(".product-container");

    //👇 Function to Create Product-Card Element (containing Image, Title, Description and Price of Product):
    const createProductCardEl = (proImg, proTitle, proDesc, proPrice) => {
        const productCardEl = document.createElement("div");
        productCardEl.classList.add("product-card");
        productCardEl.innerHTML = `<div class="img">
                                    <img src=${proImg} alt="Product Image">
                                </div>

                                <div class="info">
                                    <h1>${proTitle}</h1>
                                    <p>${proDesc}</p>
                                    <button>$ ${proPrice}</button>
                                </div>`;
        return productCardEl;

    }

    //👇 Function to Display Product-Card Element, by Appending it in the ".product-container":
    const displayProducts = (products) => {
        //Loop through the Fetched Products:
        products.forEach((product) => {
            const productCardEl = createProductCardEl(product.image, product.title, product.description, product.price);
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