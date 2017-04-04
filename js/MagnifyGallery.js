/**
 * Created by lberteh on 2017-03-03.
 */

function refreshMagnifier() {

    jQuery(document).ready(function() {

        //var imageData = getImagesForGallery();
        var imageData = [{
            thumb: canvas.toDataURL(),
            large: canvas.toDataURL()
        }]


        var remove = function removeElementsByClass(className){
            var elements = document.getElementsByClassName(className);
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }


        if(imageData.length > 0) {

            // var carImages = document.getElementsByClassName('carImage');
            // for(var i = 0; i < carImages.length; i++) {
            //     carImages[i].id = "img-" + i
            // }

            var a = document.getElementById('gallery');
            a.innerHTML = null;

            remove('magnifier-large');

            var evt = new Event(),
                m = new Magnifier(evt, {
                    largeWrapper: document.getElementById('gallery-preview')
                }),

                gallery = new Gallery(evt, m, {
                    gallery: document.getElementById('gallery'),
                    images: imageData,
                    prev: document.getElementById('gallery-prev'),
                    next: document.getElementById('gallery-next'),
                    previewText: document.getElementById('gallery-preview-title')
                });


            var images = document.getElementById('gallery').getElementsByTagName('li');
            var activeImg = images[0];

            // hide all images except for the first one

            var whatever = () => {
                var i = 0;
                for(i; i < images.length; i++) {
                    if(i != 0){
                        images[i].style.display = "none";
                    }
                }
            }

            setTimeout(whatever, 500);


            // var carImages = document.getElementById("product_carousel").getElementsByTagName('img')
            //
            // for (var i = 0; i < carImages.length; i++)
            // {
            //     carImages[i].id = 'img-' + i;
            //     carImages[i].className = 'carImage';
            // }
            //
            // jQuery('.carImage').click(function() {
            //
            //
            //
            //
            //     if (this.id == activeImg.id){
            //         console.log("Image already set")
            //     }
            //     else {
            //
            //         activeImg.style.display = "none";
            //         for(var i = 0; i < images.length; i++) {
            //             if(this.id == images[i].id)
            //             {
            //                 console.log(this.id + ' ' + images[i].id)
            //                 images[i].style.display = "block";
            //                 activeImg = images[i];
            //             }
            //         }
            //     }
            // });

        }

    });

}