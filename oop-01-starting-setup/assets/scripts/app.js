class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor( title,  imageUrl, description, price ) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

}

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }
    
    render() {}

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.price;
        }, 0);
        return sum;
    }

    constructor(renderHookId) {
        super(renderHookId, false);
        this.orderProducts = () => {
            console.log('Ordering...');
            console.log(this.items);
        }
        this.render();
    }

    addProduct(product) {
        ///this.items.push(product);
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        //const cartEl = document.createElement('section');
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        //cartEl.className = 'cart';
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', this.orderProducts);
        this.totalOutput = cartEl.querySelector('h2');
        //return cartEl;
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        // Sending false to the parent constructor to avoid rendering
        // Allow us to wait the rendering until the products are created and thus not undefined
        super(renderHookId, false);
        // Adds a new "product" property to the eventually created objects
        this.product = product;
        this.render();
    }

    addToCart() {
        //console.log('Adding product to cart');
        //console.log(this.product);
        App.addProductToCart(this.product);
    }

    render() {
        // const prodEl = document.createElement('li');
        const prodEl = this.createRootElement('li', 'product-item');
        // prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;

        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
        //return prodEl;
    }
}

class ProductList extends Component {
    #products = [];

    constructor(renderHookId) {
        super(renderHookId, false);
        this.render();
        this.#fetchProducts();
    }

    // Simulate that we don't have access to this products
    #fetchProducts() {
        this.#products = [
            new Product(
                'A Pillow',
                'https://www.saatva.com/static/assets/images/hero-carousels-wide/bedding/down-alt-pillow-carousel-4/d-down-alt-pillow-carousel-4@1x.jpg',
                'A soft pillow!',
                19.99
            ),
            new Product(
                'A Carpet', 
                'https://m.media-amazon.com/images/I/81W6An71HSL._AC_SX355_.jpg',
                'A carpet which you might like - or not.',
                89.99
            )
            /*{
                title: 'A Carpet',
                imageUrl: 'https://www.saatva.com/static/assets/images/hero-carousels-wide/bedding/down-alt-pillow-carousel-4/d-down-alt-pillow-carousel-4@1x.jpg',
                price: 19.99,
                description: 'A soft pillow!'
            },
            {
                title: 'A Pillow',
                imageUrl: 'https://m.media-amazon.com/images/I/81W6An71HSL._AC_SX355_.jpg',
                price: 89.99,
                description: 'A carpet which you might like - or not.'
            }*/
        ];
        this.renderProducts();
    }

    renderProducts() {
        for (const prod of this.#products) {
            const productItem = new ProductItem(prod, 'prod-list');
            //const prodEl = productItem.render();
            //prodList.append(prodEl);
            //productItem.render();
        }
    }

    render() {
        // const renderHook = document.getElementById('app');
        const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        
        if (this.#products && this.#products.length > 0){
            this.renderProducts();
        }
        
        console.log(prodList);
        //return prodList;
    }
}

class Shop extends Component {
    constructor() {
        super();
    }

    render() {
        //const renderHook = document.getElementById('app');

        //const cart = new ShoppingCart();

        // this.cart is a property of shop
        this.cart = new ShoppingCart('app');
        console.info('this.cart');
        console.log(this.cart);
        //this.cart.render();
        //const cartEl = this.cart.render();
        const productList = new ProductList('app');
        //const prodListEl = productList.render();
        //productList.render();
        //renderHook.append(cartEl);
        //renderHook.append(prodListEl);
    }
}

class App {
    // Static cart property used in a static method
    static cart;

    static init() {
        const shop = new Shop();
        // cart property in app, refering to the cart property in shop
        //shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();