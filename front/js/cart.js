// Récupération des balises
const section = document.getElementById('cart__items')
const deleteItem = document.getElementsByClassName('deleteItem')
for(let i = 0 ; i < deleteItem.length; i++){
  let button = deleteItem[i]
  button.addEventListener('click', () => {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
  })
}

// A REPRENDRE

// function updateCartTotal(){
//   let cartItemContainer = document.getElementById('cart__items')[0]
//   let cartRows = cartItemContainer.getElementsByClassName('cart__item')
//   for(let i = 0 ; i < cartRows.length; i++){
//     let cartRow = cartRows[i]
// //   }
// }

// Chaîne de caractères en JavaScript object
let cart = JSON.parse(localStorage.getItem('cart'))

//
for (let i = 0; i < cart.length; i++) {
    section.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${cart[i].image}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${cart[i].name}</h2>
        <p>${cart[i].color}</p>
        <p>${cart[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
}