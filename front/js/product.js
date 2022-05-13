const img = document.getElementsByClassName('item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const colors = document.getElementById('colors')

fetch('http://localhost:3000/api/products')
    .then(res => {
        if(res.ok) {
            res.json().then(data => {
                let params = new URLSearchParams(document.location.search)
                let id = params.get('id')
                for(let i = 0; i <= data.length; i++) {
                    if(id == data[i]._id) {
                        img.innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}">`
                        title.innerHTML = data[i].name
                        price.innerHTML = data[i].price
                        description.innerHTML = data[i].description
                        data[i].colors.forEach(color => colors.innerHTML += `<option value="">${color}</option>`)
                    }
                }
            })
        } else {
            console.log('erreur')
        }
    })