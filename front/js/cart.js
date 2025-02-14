// Récupération des balises
const section = document.getElementById('cart__items')
const totalQuantity = document.getElementById('totalQuantity')
const deleteItemButton = document.getElementsByClassName('deleteItem')


// Récupération du panier
let cart = JSON.parse(localStorage.getItem('cart'))


for(let i = 0; i < cart.length; i++){

  // Ajout de l'article
  let productArticle = document.createElement('article')
  document.querySelector('#cart__items').appendChild(productArticle)
  productArticle.className = 'cart__item'
  productArticle.setAttribute('data-id', cart[i].id)

  // Ajout de div
  let productImgDiv = document.createElement('div')
  productArticle.appendChild(productImgDiv)
  productImgDiv.className = 'cart__item__img'

  // Ajout de l'image
  let productImg = document.createElement('img')
  productImgDiv.appendChild(productImg)
  productImg.src = cart[i].img
  productImg.alt = cart[i].altImg

  // Ajout de la div item content
  let productItemContent = document.createElement('div')
  productArticle.appendChild(productItemContent)
  productItemContent.className = 'cart__item__content'

  // Ajout de la div title price
  let productItemContentTitlePrice = document.createElement('div')
  productItemContent.appendChild(productItemContentTitlePrice)
  productItemContentTitlePrice.className = 'cart__item__content__titlePrice'

  // Ajout du titre
  let productName = document.createElement('h2')
  productItemContentTitlePrice.appendChild(productName)
  productName.innerHTML = cart[i].name

  // Ajout de la couleur
  let productColor = document.createElement('p')
  productItemContent.appendChild(productColor)
  productColor.innerHTML = cart[i].color

  // Ajout de la div item content settings
  let productItemContentSettings = document.createElement('div')
  productItemContent.appendChild(productItemContentSettings)
  productItemContentSettings.className = 'cart__item__content__settings'

  // Ajout de la div item content settings quantity
  let productItemContentSettingsQuantity = document.createElement('div')
  productItemContentSettings.appendChild(productItemContentSettingsQuantity)
  productItemContentSettingsQuantity.className = 'cart__item__content__settings__quantity'

  // Ajout du prix
  let productPrice = document.createElement('price')
  productItemContentTitlePrice.appendChild(productPrice)
  fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(product => {
      let foundId = product.find(item => item._id == cart[i].id)
      let foundPrice = foundId.price
      productPrice.innerHTML = foundPrice + ' €'
  })

  // Ajout de la quantité
  let productQuantityText = document.createElement('p')
  productItemContentSettingsQuantity.appendChild(productQuantityText)
  productQuantityText.innerHTML = 'Qté : '
  let productQuantityValue = document.createElement('input')
  productItemContentSettingsQuantity.appendChild(productQuantityValue)
  productQuantityValue.value = cart[i].quantity
  productQuantityValue.className = 'itemQuantity'
  productQuantityValue.setAttribute('type', 'number')
  productQuantityValue.setAttribute('min', '1')
  productQuantityValue.setAttribute('max', '100')
  productQuantityValue.setAttribute('name', 'itemQuantity')

  // Ajout de la div pour le bouton 'Supprimer'
  let productItemContentSettingsDelete = document.createElement('div')
  productItemContentSettings.appendChild(productItemContentSettingsDelete)
  productItemContentSettingsDelete.className = 'cart__item__content__settings__delete'

  // Ajout du bouton 'Supprimer'
  let deleteButton = document.createElement('p')
  productItemContentSettingsDelete.appendChild(deleteButton)
  deleteButton.className = 'deleteItem'
  deleteButton.innerHTML = 'Supprimer'
  deleteButton.addEventListener('click', (e) => {

    e.preventDefault

    let deleteId = cart[i].id
    let deleteColor = cart[i].color
    cart = cart.filter(element => element.id !== deleteId || element.color !== deleteColor)
    localStorage.setItem('cart', JSON.stringify(cart))

    if(cart.length == 0){
      localStorage.clear()
    }
    location.reload()
  })
}

function totalPrice(){

  // Total quantité
  let productQuantity = document.getElementsByClassName('itemQuantity')
  let productLength = productQuantity.length, totalQuantity = 0

  for(let i = 0; i < productLength; i++){
    totalQuantity += productQuantity[i].valueAsNumber
  }

  let productTotalQuantity = document.getElementById('totalQuantity')
  productTotalQuantity.innerHTML = totalQuantity

  // Total prix
  totalPrice = 0

  for(let i = 0; i < productLength; i++){
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(product => {
        let foundId = product.find(item => item._id == cart[i].id)
        let foundPrice = foundId.price
        totalPrice += (productQuantity[i].valueAsNumber * foundPrice)
        let productTotalPrice = document.getElementById('totalPrice')
        productTotalPrice.innerHTML = totalPrice
    })
  }
}

totalPrice()

function changeQuantity() {
  let itemQtt = document.querySelectorAll('.itemQuantity')

  for (let i = 0; i < itemQtt.length; i++) {
    itemQtt[i].addEventListener('change', (e) => {

    e.preventDefault()

    let itemNewQtt = itemQtt[i].value

    const newLocalStorage = {
      id: cart[i].id,
      img: cart[i].img,
      altImg: cart[i].altImg,
      name: cart[i].name,
      color: cart[i].color,
      quantity: parseInt(itemNewQtt),
    }

    cart[i] = newLocalStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    location.reload()
    })
  }
}

changeQuantity()


function formWithRegex(){
  // Ajout des Regex
  let form = document.querySelector('.cart__order__form')

  // Regex
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')
  let charRegExp = new RegExp('^[a-zA-Z ,."-]+$')
  let addressRegExp = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+')

  // Modification prénom
  form.firstName.addEventListener('change', function(){
      validFirstName(this)
  })
  // Modification nom de famille
  form.lastName.addEventListener('change', function(){
      validLastName(this)
  })
  // Modification adresse
  form.address.addEventListener('change', function(){
      validAddress(this)
  })
  // Modification ville
  form.city.addEventListener('change', function(){
      validCity(this)
  })
  // Modification email
  form.email.addEventListener('change', function(){
      validEmail(this)
  })

  // Validation prénom
  const validFirstName = function(inputFirstName){
      let firstNameErrorMsg = inputFirstName.nextElementSibling
      if (charRegExp.test(inputFirstName.value)){
          firstNameErrorMsg.innerHTML = ''
      } else {
          firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  // Validation nom
  const validLastName = function(inputLastName){
      let lastNameErrorMsg = inputLastName.nextElementSibling
      if (charRegExp.test(inputLastName.value)){
          lastNameErrorMsg.innerHTML = ''
      } else {
          lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  // Validation adresse
  const validAddress = function(inputAddress){
      let addressErrorMsg = inputAddress.nextElementSibling
      if (addressRegExp.test(inputAddress.value)){
          addressErrorMsg.innerHTML = ''
      } else {
          addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  // Validation ville
  const validCity = function(inputCity){
      let cityErrorMsg = inputCity.nextElementSibling
      if (charRegExp.test(inputCity.value)){
          cityErrorMsg.innerHTML = ''
      } else {
          cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  // Validation email
  const validEmail = function(inputEmail){
      let emailErrorMsg = inputEmail.nextElementSibling
      if (emailRegExp.test(inputEmail.value)){
          emailErrorMsg.innerHTML = ''
      } else {
          emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.'
      }
  }
}
formWithRegex()

function postForm() {
  const order = document.getElementById('order')
  order.addEventListener('click', (event) => {
  event.preventDefault()

  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }

  let products = []
  for (let i = 0; i < cart.length; i++) {
      products.push(cart[i].id)
  }
  console.log(products)

  const sendFormData = {
    contact,
    products,
  }  

  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: { 
      'Content-Type': 'application/json',
    }
  }

  fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
      localStorage.setItem('orderId', data.orderId)
      document.location.href = 'confirmation.html?id='+ data.orderId
    })
  })
}
postForm()