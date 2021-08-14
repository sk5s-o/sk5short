const your_url = document.querySelector('#your_url')
const your_title = document.querySelector('#your_title')
const your_description = document.querySelector('#your_description')
const your_image = document.querySelector('#your_image')

const preview_image = document.querySelectorAll('.preview-image')
const preview_title = document.querySelectorAll('.preview-title')
const preview_description = document.querySelectorAll('.preview-description')
const submit_form_button = document.querySelector('#submit_form_button')

const default_description = 'sk5short | make a short link just in a minutes, use javascript to redirect. | samko5sam'
const default_title = 'sk5short'
const default_image = 'https://alsonow.neocities.org/img/alsonow-lite-logo.svg'

submit_form_button.addEventListener('click',function(e){
  e.preventDefault();
  let content = submit_form()
  console.log(content)
  modalMessage(`<h1 class='title is-2 uppercase'>copy this text</h1><pre><code id='code_area' contenteditable="true"></code>`)
  let textarea = document.getElementById('code_area')
  textarea.innerText = `<!--
|     sk5short     |
| make a short link just in a minutes, use javascript to redirect.| https://sk5s.github.io/sk5short/ -->${content}`
  generate_download_button(textarea.innerText, 'index.html', 'txt')
})

function geturlfavicon(url){
  let word = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
  return word
}
function use_website_favicon(){
  if (your_url.value){
    your_image.value = geturlfavicon(your_url.value)
  } else {
    your_image.value = 'https://alsonow.neocities.org/img/alsonow-lite-logo.svg'
  }
  updatepreview()
}
function updatepreview(){
  preview_image.forEach(function(item){
    item.src = your_image.value === "" ? default_image : your_image.value
  })
  preview_title.forEach(function(item){
    item.innerHTML = your_title.value === "" ? default_title : your_title.value
  })
  preview_description.forEach(function(item){
    item.innerHTML = your_description.value === "" ? default_description :your_description.value
  })
}
function submit_form(){
  your_image.value = your_image.value === "" ? default_image : your_image.value
  your_title.value = your_title.value === "" ? default_title : your_title.value
  your_description.value = your_description.value === "" ? default_description :your_description.value
  return `<!DOCTYPE html><html lang="zh" prefix="og: http://ogp.me/ns#"><head><title>${your_title.value}</title><meta charset="utf-8"><meta name="author" content="samko5sam"><meta name="description" content="${your_description.value}"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/png" href="${your_image.value}"><meta property="og:title" content="${your_title.value}"><meta property="og:description" content="${your_description.value}"><meta property="og:url" content="${your_url.value}"><meta property="og:locale" content="${your_locale.value}"><meta property="og:image" content="${your_image.value}"><meta property="og:type" content="${your_type.value}"><meta property="og:site_name" content="${your_site_name.value}"></head><body><noscript><h1>您的瀏覽器不支援javascript，請手動按連結<br><h2>Javascript didn't enable, please open it by yourself.</h2></h1></noscript><script>window.location.href="${your_url.value}";</script><h1><a href="${your_url.value}">GO</a></h1></body></html>`
}

function generate_download_button(data, filename, type) {
  var file = new Blob([data], {type: type}); // Others
  let a = document.createElement("a");
  let url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  a.classList.add('button','is-success','uppercase')
  a.innerText = 'download'
  let downloadButton = document.getElementById('download_button')
  downloadButton.innerHTML = ""
  downloadButton.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}