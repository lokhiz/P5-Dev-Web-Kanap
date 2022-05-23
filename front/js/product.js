const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const colors = document.getElementById('colors')
const addToCart = document.getElementById('addToCart')
const quantity = document.getElementById('quantity')
localStorage.clear()

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

                        quantity.addEventListener('change', (e) => {
                            let newValue = parseInt(e.target.value)
                            quantity.setAttribute('value', newValue)
                        })
                        newValue = 0
                        addToCart.addEventListener('click', (e) => {
                            let cart = JSON.parse(localStorage.getItem('cart')) || []
                            let chosenColor = colors.options[colors.selectedIndex].text
                            const itemExists = (item) => item.name == newItem.name
                            let newItem = {
                                image: data[i].imageUrl,
                                name: data[i].name,
                                price: data[i].price,
                                color: chosenColor,
                                quantity: newValue
                            }
                            cart.push(newItem)
                            localStorage.setItem('cart', JSON.stringify(cart))
                            console.log(JSON.parse(localStorage.getItem('cart')))
                        })
                }
            })
        } else {
            alert('erreur')
        }
    })