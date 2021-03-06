const localhostUrl = `http://localhost:5000/api/v1/my-gallery`
const url = `https://back-end-test-1.herokuapp.com/api/v1/my-gallery`
const errElement = document.querySelector('.err')
//  loading element
const loader = document.querySelector('.loaderText')

//offline mode
window.addEventListener('load', function () {
  function updateOnlineStatus(event) {
    navigator.onLine
      ? alert('you are online now')
      : document.querySelector('.wifi').setAttribute('style', 'display: block')
  }

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})
// fetching data from the api
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.list.forEach((image) => {
      loader.style.display = 'none'
      const img = document.createElement('img')
      img.classList.add('imageItem')
      img.loading = 'lazy'
      img.src = image.url
      img.alt = image.title

      let content = document.querySelector('.content')

      content.innerHTML += img.outerHTML + ' <h4> ' + image.title + '</h4> '
      loader.removeAttribute('display')
    })
  })

  .catch((err) => {
    if (err.status !== '200') {
      errElement.innerHTML += `Obs something went wrong see error message=> ${err.message}`
      loader.removeAttribute('display')
    }
  })
