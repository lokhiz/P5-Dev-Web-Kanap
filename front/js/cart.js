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
  productPrice.innerHTML = cart[i].price + '€'

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
    totalPrice += (productQuantity[i].valueAsNumber * cart[i].price)
  }

  let productTotalPrice = document.getElementById('totalPrice')
  productTotalPrice.innerHTML = totalPrice
}

totalPrice()

function changeQuantity(){
  let quantityChange = document.querySelectorAll('.itemQuantity')

  for (let i = 0; i < quantityChange.length; i++){
    quantityChange[i].addEventListener('change', (e) => {
      e.preventDefault()

      let quantityChosenToChange = cart[i].quantity
      let quantityValueToChange = quantityChange[i].valueAsNumber

      let quantityChanged
    })
  }
}