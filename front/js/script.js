async function getProducts() {
    let products = await fetch('http://localhost:3000/api/products')
    return products.json()
}
getProducts()
 async function creationProducts() {
    let result = await getProducts()
    .then ((product) => {
        for (let i = 0; i < product.length; i++) {
            // Ajout de a
            let productLink = document.createElement('a')
            document.querySelector('.items').appendChild(productLink)
            productLink.href = `product.html?id=${product[i]._id}`
            // Ajout des articles
            let productArticle = document.createElement('article')
            productLink.appendChild(productArticle)
            // Ajout de l'image
            let productImg = document.createElement('img')
            productArticle.appendChild(productImg)
            productImg.src = product[i].imageUrl
            productImg.alt = product[i].altTxt
            // Ajout du titre
            let productName = document.createElement('h3')
            productArticle.appendChild(productName)
            productName.classList.add('productName')
            productName.innerHTML = product[i].name
            // Ajout de 'p'
            let productDescription = document.createElement('p')
            productArticle.appendChild(productDescription)
            productDescription.classList.add('productName')
            productDescription.innerHTML = product[i].description
        }
    })
}
creationProducts()