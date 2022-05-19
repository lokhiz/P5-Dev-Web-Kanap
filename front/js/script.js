//Récupération de l'ID
const element = document.getElementById('items')

//Récupération des données
fetch('http://localhost:3000/api/products')
    .then(response => {
        if(response.ok) {
            response.json()
    .then(data => {
        for(let i = 0; i <= data.length; i++) {
            element.innerHTML += `<a href="./product.html?id=${data[i]._id}" id="link">
                                <article>
                                <img src="${data[i].imageUrl}" alt="${data[i].altTxt}" id="img">
                                <h3 class="productName" id="title">${data[i].name}</h3>
                                <p class="productDescription" id="p">${data[i].description}</p>
                                </article>
                            </a>`
                }
            })
        } else {
            alert('erreur')
        }
    })