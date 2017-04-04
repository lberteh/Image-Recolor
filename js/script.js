function fetchData () {
  const data = [ { value: 'lol1234', name: 'Logo 1' }, { value: 'heyy', name: 'Logo 2' }, { value: 'checkitout', name: 'Logo 3' }, { value: 'leafs', name: 'Logo 4' }]
  return new Promise(function (resolve) {
    resolve(data)
  })
}

function fetchLogo (logo) {
  const logos = [
    {
      image: 'lol1234',
      x: 10,
      y: 25,
      w: 100,
      h: 250
    },
    {
      image: 'heyy',
      x: 100,
      y: 225,
      w: 150,
      h: 150
    },
    {
      image: 'checkitout',
      x: 15,
      y: 15,
      w: 50,
      h: 100
    },
    {
      image: 'leafs',
      x: 60,
      y: 28,
      w: 300,
      h: 100
    }
  ]

  return new Promise(function (resolve, reject) {
    const foundLogo = logos.filter(data => data.image === logo)
    if(foundLogo.length > 0) {
      resolve(foundLogo[0])
    } else {
      reject(new Error('No logo with that name found'))
    }
  })
}


/**
 * Get document elements for manipulation
 */
const logoSelector = document.getElementById('logoSelection')
const logoImage = document.getElementById('overlayLogo').querySelector('img')

/**
 * Takes the logo data returned from the server and set the attributes on the image
 * @param data - The logo data from the fetchData server request function
 */
function setData (data) {
  logoImage.src = `assets/${data.image}`
  logoImage.style.top = `${data.y}px`
  logoImage.style.left = `${data.x}px`
  logoImage.style.width = `${data.w}px`
  logoImage.style.height = `${data.h}px`
}

/**
 * On load function fetches the data for the dropdown box, then sets the first logo to the first item in the data.
 */
window.onload = function () {
  fetchData()
    .then(function (data) {
      data.forEach(function (item) {
        const newOption = document.createElement('option')
        newOption.value = item.value
        newOption.innerText = item.name
        logoSelector.appendChild(newOption)
      })

    })
}

/**
 * Everytime the drop down changes get the options value, fetch the logo and call setData with the new logos's data
 */
logoSelector.addEventListener('change', function (e) {
  const selectedLogo = logoSelector.value

  fetchLogo(selectedLogo)
    .then(data => setData(data))
    .catch(err => console.log(err))
})


"store/$vendorSettingsDTO.vendorId/assets/themes/$vendorSettingsDTO.skinname/images/logos/logo"