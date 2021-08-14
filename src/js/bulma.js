const navbar_burger_item = document.getElementById('navbar-burger-item')
const navbar_burger_button = document.querySelector('[data-target="navbar-burger-item"]')
const message_modal = document.querySelector('#message_modal')
const message_modal_content = document.querySelector('#message_modal_content')
const message_modal_close_button = document.querySelectorAll('.message_modal_close_button')

navbar_burger_button.addEventListener('click',()=>{
  navbar_burger_button.classList.toggle('is-active')
  navbar_burger_item.classList.toggle('is-active')
})
message_modal_close_button.forEach(function(item){
  item.addEventListener('click',()=>{
    message_modal.classList.toggle('is-active')
  })
})

function modalMessage(message) {
  message_modal.classList.toggle('is-active')
  message_modal_content.innerHTML = message
}