document.addEventListener("DOMContentLoaded", () => {
    const url = "https://fakestoreapi.com/products"; //REST API's Endpoint
    const fetchedProducts = []; //stores the Products, initially Fetched from the API.

    //Select HTML DOM Elements:
    const searchInpEl = document.querySelector("#search");
    const productContainerEl = document.querySelector(".product-container");

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
        //Ensure the Product-Container is Empty:
        productContainerEl.innerHTML = "";

        //Loop through the Fetched Products:
        products.forEach((product) => {
            const productCardEl = createProductCardEl(product);
            productContainerEl.appendChild(productCardEl);
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

    //👇 Function to Check the text contains a "string value" or not:
    const checkTextContains = (targetText, searchVal) => {
        return targetText.toLowerCase().includes(searchVal.toLowerCase());
    }

    // 👇Function to Search & Filter Products to Display on the Webpage:
    const searchFilterProducts = (event) => {
        let searchVal = event.target.value.trim();

        if(searchVal === '') { //then, Display All the Products, when Nothing Searched by the User
            displayProducts(fetchedProducts);
        }
        else { //then, Display Only Those Products, which Contains the "searchVal"
            productContainerEl.innerHTML = ""; //Ensure the <Product-Container> is Empty.
            
            // Loop the "fetchedProducts" to Search and Filter the "searchVal": 
            fetchedProducts.forEach( (product) => {
                if( checkTextContains(product.title, searchVal) || checkTextContains(product.description, searchVal) || checkTextContains(product.price.toString(), searchVal)) {
                    const productCardEl = createProductCardEl(product);
                    productContainerEl.appendChild(productCardEl);
                }
            });
        }
    }

    fetchProducts().then((products) => {
        fetchedProducts.push(...products);
        displayProducts(fetchedProducts);
    });

    searchInpEl.addEventListener("input", searchFilterProducts);
});