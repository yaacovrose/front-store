import { fetchProduct, fetchAllProducts, addProductToAPI, updateProductInAPI, deleteProductFromAPI } from './fetch.js'


async function fetchData(){
    const rest = await fetch('http://localhost:8080/api/products')
    const data = await rest.json()
    console.log(data)
    return data
} 

// const data = await fetchData()


function createDOMElement(tagName,  parent, attributes='', textContent='') {
    const element = document.createElement(tagName);
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    parent.appendChild(element);

    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

function deleteCurrent(){
    // const main = document.querySelector('main');
    const current = document.querySelector('.current');
    if (current) {
        current.remove();
    }
}


export async function createCard(category) {
    const data = await fetchData()
    const main = document.querySelector('main');
    const current = document.querySelector('.current');
    if (current) {
        current.remove();
    }

    const products = createDOMElement('div', main, { 'class': 'current' });

    for (const pro of data) {
        if (pro.category === category || category === '') {
            const product = createDOMElement('div', products, { 'class': 'product', 'id': pro.id });

            const productTop = createDOMElement('div', product, { 'class': 'top' });
            const images = createDOMElement('img', productTop, { 'class': 'images', 'src': pro.image });

            const productBottom = createDOMElement('div', product, { 'class': 'bottom' });
            const detail = createDOMElement('span', productBottom, {}, pro.title);

            const buttons = createDOMElement('div', productBottom, { 'class': 'buttons' });
            const delete_card = createDOMElement('i', buttons, { 'class': 'material-icons' }, 'delete');
            const edit_card = createDOMElement('i', buttons, { 'class': 'material-icons' }, 'create');

            product.addEventListener('click', () => productPage(pro.id));

            delete_card.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteProductFromAPI(pro.id)
                product.remove();
            });

            edit_card.addEventListener('click', (e) => {
                e.stopPropagation();
                let current = document.querySelector('.current');
                current.remove();
                editProduct(pro.id);
            });
        }
    }
}



export function editProduct(pro) {
    deleteCurrent()
    fetchData()
    const main = document.querySelector('main');
    const product = createDOMElement('div', main, {'class': 'current'});
    product.classList.add('page');

    const top = createDOMElement('div', product, {'class': 'topPage'});

    const icons = createDOMElement('div', top);

    const back = createDOMElement('i', icons, {'class': 'material-icons'}, 'arrow_back');
    const edit_card = createDOMElement('i', icons, {'class': 'material-icons'}, 'create');
    const delete_card = createDOMElement('i', icons, {'class': 'material-icons'}, 'delete');

    const text = createDOMElement('div', top);

    const h1 = createDOMElement('h1', text,'','Edit Product');
    
    const detail = createDOMElement('div', product,{'class': 'editDetail'});

    const title = createDOMElement('label', detail, {'class': 'label'}, 'title:');
    const titleInput = createDOMElement('input', title, {'class': 'input', 'placeholder': data[pro].title});
    
    const category = createDOMElement('label', detail, {'class': 'label'}, 'Category:');
    const categoryInput = createDOMElement('input', category, {'class': 'input', 'placeholder': data[pro].category});
    
    const price = createDOMElement('label', detail, {'class': 'label'}, 'price:');
    const priceInput = createDOMElement('input', price, {'class': 'input', 'placeholder': data[pro].price});
    
    const image = createDOMElement('label', detail, {'class': 'label'}, 'image_URL:');
    const imageInput = createDOMElement('input', image, {'class': 'input', 'placeholder': data[pro].image});
    
    const quantity = createDOMElement('label', detail, {'class': 'label'}, 'quantity:');
    const quantityInput = createDOMElement('input', quantity, {'class': 'input', 'placeholder': data[pro].quantity});
    
    const description = createDOMElement('label', detail, {'class': 'label'}, 'description:');
    const descriptionInput = createDOMElement('input', description, {'class': 'input', 'placeholder': data[pro].description});

    const editButton = createDOMElement('button', detail, {'id': 'editButton'}, 'Edit');
    editButton.addEventListener('click', () => {
        const update = {}
        const titles = titleInput.value;
        if (titles !== '') {
            update.title = titles;
        }
        const categories = categoryInput.value;
        if (categories !== '') {
            update.category = categories;
        }
        const prices = priceInput.value;
        if (prices !== '') {
            update.price = prices;
        }
        const images = imageInput.value;
        if (images !== '') {
            update.image = images;
        }
        const quantities = quantityInput.value;
        if (quantities !== '') {
            update.quantity = quantities;
        }
        const desc = descriptionInput.value;
        if (desc !== '') {
            update.description = desc;
        }
        updateProductInAPI(pro, update)
        createCard('')
    });
}




export async function productPage(pro) {
    deleteCurrent();
    const data = await fetchData()
    const current = data.find((prod) => prod.id === pro)
    const main = document.querySelector('main');
    const product = createDOMElement('div', main, {'class': 'current'});
    product.classList.add('page');

    const top = createDOMElement('div', product, {'class': 'topPage'});
    
    const icons = createDOMElement('div', top);
    
    const back = createDOMElement('i', icons, {'class': 'material-icons'}, 'arrow_back');
    const edit_card = createDOMElement('i', icons, {'class': 'material-icons'}, 'create');
    const delete_card = createDOMElement('i', icons, {'class': 'material-icons'}, 'delete');

    const text = createDOMElement('div', top);

    const h1 = createDOMElement('h1', text, '', 'Product Page');

    const details = createDOMElement('div', product, {'class': 'details'})

    const detailsImg = document.createElement('div');
    details.appendChild(detailsImg);
    detailsImg.classList.add('detailImg');

    const images = createDOMElement('img', detailsImg, {'class': 'imagePage', 'src': current.image});

    const detail = document.createElement('div');
    details.appendChild(detail);
    detail.classList.add('detail');

    const title = createDOMElement('h3', detail, '', 'title:');
    const titleDetail = createDOMElement('span', detail, '', current.title);

    const description = createDOMElement('h3', detail, '', 'Description:');
    const descriptionDetail = createDOMElement('span', detail, '', current.description);

    const category = createDOMElement('h3', detail, '', 'Category:');
    const categoryDetail = createDOMElement('span', detail, '', current.category);

    const price = createDOMElement('h3', detail, '', 'Price:');
    const priceDetail = createDOMElement('span', detail, '', current.price);

    const quantity = createDOMElement('h3', detail, '', 'Quantity:');
    const quantityDetail = createDOMElement('span', detail, '', current.quantity);
}


export function addProduct() {
    const main = document.querySelector('main');
    const current = document.querySelector('.current');
    current.remove();
    const product = createDOMElement('div', main, {'class': 'current'});
    product.classList.add('page');

    const top = createDOMElement('div', product, {'class': 'topPage'});

    const icons = createDOMElement('div', top);

    const back = createDOMElement('i', icons, {'class': 'material-icons'}, 'arrow_back');

    const text = createDOMElement('div', top);

    const h2 = createDOMElement('h1', text, '', 'Add New Product');

    const detail = createDOMElement('div', product, {'class': 'editDetail'});

    const title = createDOMElement('label', detail, {'class': 'label'}, 'title:');
    const titleInput = createDOMElement('input', title, {'class': 'input', 'placeholder': 'Title...'});

    const category = createDOMElement('label', detail, {'class': 'label'}, 'Category:');
    const categoryInput = createDOMElement('input', category, {'class': 'input', 'placeholder': 'Category...'});

    const price = createDOMElement('label', detail, {'class': 'label'}, 'price:');
    const priceInput = createDOMElement('input', price, {'class': 'input', 'placeholder': 'Price...'});

    const image = createDOMElement('label', detail, {'class': 'label'}, 'image_URL:');
    const imageInput = createDOMElement('input', image, {'class': 'input', 'placeholder': 'Image...'});

    const quantity = createDOMElement('label', detail, {'class': 'label'}, 'quantity:');
    const quantityInput = createDOMElement('input', quantity, {'class': 'input', 'placeholder': 'Quantity...'});

    const description = createDOMElement('label', detail, {'class': 'label'}, 'description:');
    const descriptionInput = createDOMElement('input', description, {'class': 'input', 'placeholder': 'Description...'});

    const addButton = createDOMElement('button', detail, {'id': 'editButton'}, 'ADD');
    addButton.addEventListener('click', () => {
        const title = titleInput.value;
        const category = categoryInput.value;
        const price = priceInput.value;
        const image = imageInput.value;
        const quantity = +quantityInput.value;
        const description = descriptionInput.value;
        addProductToAPI({
            title,
            category,
            price,
            image,
            quantity,
            description,
        });
        createCard('');
    });
}
