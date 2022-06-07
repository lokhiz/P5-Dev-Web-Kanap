//Récupération de l'id via les paramètres de l'url
const urlProduct = new URL(window.location.href).searchParams.get('id')

//Récupération des sélecteurs
let imageProduct = document.querySelector('.item__img')
let img = document.createElement('img')
imageProduct.appendChild(img)
let title = document.getElementById('title')
let price = document.getElementById('price')
let description = document.getElementById('description')
let colors = document.getElementById('colors')
let addToCart = document.getElementById('addToCart')

// Récupération de l'article grace à l'id + affichage des données de ce dernier
async function getArticle() {
    await fetch('http://localhost:3000/api/products/' + urlProduct)
    .then((response) => response.json())
    .then(product => {
        img.setAttribute('src', product.imageUrl)
        img.setAttribute('alt', product.altTxt)
        title.innerHTML = product.name
        price.innerHTML = product.price
        description.innerHTML = product.description
        document.title = product.name

        for (let i = 0; i < product.colors.length; i++) {
            let color = document.createElement('option')
            color.setAttribute('value', product.colors[i])
            color.innerHTML = product.colors[i]
            colors.appendChild(color)
        }
    })
}

getArticle()

// Ajouter un article au panier

