import { createCard, addProduct } from "./function.js";
import { fetchProduct, fetchAllProducts, addProductToAPI, updateProductInAPI, deleteProductFromAPI } from './fetch.js'

async function fetchData(){
    const rest = await fetch('http://localhost:8080/api/products')
    const data = await rest.json()
    console.log(data)
    return data
} 

const data = await fetchData()
    // console.log(data)
    

    createCard('')


    let add = document.querySelector('#add')
    add.addEventListener('click', () => {
        addProduct()
    })

    let all = document.querySelector('#all');
    console.log(all);
    all.addEventListener('click', () => {
        let current = document.querySelector('.current');
        current.remove()
        createCard('');
    })

    let men = document.querySelector('#men');
    console.log(all);
    men.addEventListener('click', () => {
        let current = document.querySelector('.current');
        current.remove()
        createCard("men's clothing");
    })

    let women = document.querySelector('#women');
    console.log(all);
    women.addEventListener('click', () => {
        let current = document.querySelector('.current');
        current.remove()
        createCard("women's clothing");
    })

    let jewelery = document.querySelector('#jewelery');
    console.log(all);
    jewelery.addEventListener('click', () => {
        let current = document.querySelector('.current');
        current.remove()
        createCard("jewelry");
    })

    let electronics = document.querySelector('#electronics');
    console.log(all);
    electronics.addEventListener('click', () => {
        let current = document.querySelector('.current');
        current.remove()
        createCard('electronics');
    })

// })