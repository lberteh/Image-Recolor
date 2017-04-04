
let canvas = document.createElement("canvas")
let context = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500
canvas.style.backgroundColor = "blue"

let t1 = document.getElementById("t1")
t1.appendChild(canvas)

let shirtDiv = document.getElementById('itemImg')
let shirtImg = shirtDiv.getElementsByClassName('img-responsive')




logoSelector.addEventListener('change', function () {
    drawImages();
})

function loadImage(url) {

    return new Promise((resolve, reject) => {
        let image = new Image()

        image.onload = function() {


            resolve(image)
        }

        image.onerror = function() {
            let msg = 'Could not load image at ' + url;
            reject(new Error(msg))
            console.log(url);
        }

        image.src = url
    })
}

function drawImages() {

    Promise.all([
        loadImage(shirtImg[0].src),
        loadImage(`./store//20161122470/assets/logos/${document.getElementById('logoSelection').options[document.getElementById('logoSelection').selectedIndex].value}`)
    ]).then((images) => {

        context.drawImage(images[0], 0, 0)
        context.drawImage(images[1], 0, 0)

    }).catch((error) => {
        console.log("Image not found")
    })

}
