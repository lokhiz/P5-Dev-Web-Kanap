//Récupération de l'id avec l'url
const idProduct = new URL(window.location.href).searchParams.get('id')

//Récupération des sélecteurs
let imageProduct = document.querySelector('.item__img')
let img = document.createElement('img')
imageProduct.appendChild(img)
let title = document.getElementById('title')
let price = document.getElementById('price')
let description = document.getElementById('description')
let colors = document.getElementById('colors')
let addToCartButton = document.getElementById('addToCart')

// Récupération de l'article grace à l'id et affichage
async function getArticle() {
    await fetch('http://localhost:3000/api/products/' + idProduct)
    .then(response => response.json())
    .then(product => {
        img.setAttribute('src', product.imageUrl)
        img.setAttribute('alt', product.altTxt)
        title.innerHTML = product.name
        price.innerHTML = product.price
        description.innerHTML = product.description

        // Boucle pour récupérer les couleurs du produit sélectionné
        for (let i = 0; i < product.colors.length; i++) {
            let color = document.createElement('option')
            color.setAttribute('value', product.colors[i])
            color.innerHTML = product.colors[i]
            colors.appendChild(color)
        }
    })
}

getArticle()

////////// Ajouter un article au panier //////////
addToCartButton.addEventListener('click', addToCart)
function addToCart(){
    // On récupère les élément avec les id
    let color = document.getElementById('colors')
    let quantity = document.getElementById('quantity')
    // Condition pour la quantité, obligé de saisir entre 1 et 100 et la quantité et la couleur différents de 0
    if(quantity.value >= 1 && quantity.value <= 100 && color.value != 0){
        if(localStorage.getItem('cart')){

            let product = JSON.parse(localStorage.getItem('cart'))

            let id = idProduct
            let color = document.getElementById('colors').value
            let quantity = document.getElementById('quantity').value

            let result = product.find(element => element.id == idProduct && element.color == color)

            if(result){
                let newQuantity = parseInt(quantity) + parseInt(result.quantity)
                result.quantity = newQuantity
                localStorage.setItem('cart', JSON.stringify(product))
            } else {

                let product = JSON.parse(localStorage.getItem('cart'))
                let id = idProduct
                let name = document.getElementById('title').textContent
                let color = document.getElementById('colors').value
                let quantity = document.getElementById('quantity').value
                let imgProduct = img.src
                let altImg = img.alt
                let price = document.getElementById('price').textContent

                let productObject = {
                    id: idProduct,
                    name: name,
                    color: color,
                    quantity: parseInt(quantity),
                    img: imgProduct,
                    altImg: altImg,
                    price: parseInt(price),
                }

                product.push(productObject)
                let objectProduct = JSON.stringify(product)
                localStorage.setItem('cart', objectProduct)
            }
        } else {
            let productCart = []

            let id = idProduct
            let name = document.getElementById('title').textContent
            let color = document.getElementById('colors').value
            let quantity = document.getElementById('quantity').value
            let imgProduct = img.src
            let altImg = img.alt
            let price = document.getElementById('price').textContent

            let productObject = {
                id: idProduct,
                name: name,
                color: color,
                quantity: parseInt(quantity),
                img: imgProduct,
                altImg: altImg,
                price: parseInt(price),
            }
            productCart.push(productObject)
            let objectProduct = JSON.stringify(productCart)
            localStorage.setItem('cart', objectProduct)
        }
    }
}