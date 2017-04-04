function render_img_template(imgSize, filename) {
    return '<li> \
    <a href="#" rel="tb"> \
      <img src="store/'+itempage.vid+'/assets/items/'+imgSize+'/'+filename+'" alt="" /> \
    </a> \
  </li>';
}

jQuery(document).ready(function() {
    itempage.addRefreshCallback(updateProductCarousel);

    var carouselObj = jQuery('#product_carousel .jcarousel');
    carouselObj.jcarousel({
        vertical: false,
        scroll: 3,
        wrap: 'circular',
        itemFallbackDimension:75
    });

    updateProductCarousel.apply(itempage.itemElements[0].currentSkuBO.item.domain);

    jQuery("#product_carousel .controls").find(".next").click(function( event ){
        event.preventDefault();
        jQuery('#product_carousel .jcarousel').jcarousel('scroll', '+=4');
    });

    jQuery("#product_carousel .controls").find(".prev").click(function( event ){
        event.preventDefault();
        jQuery('#product_carousel .jcarousel').jcarousel('scroll', '-=4');
    });

    if (carouselObj.find('li').length > 4) {
        jQuery("#product_carousel .controls").show();
    } else if (carouselObj.find('li').length == 1) {
        jQuery("#product_carousel").hide();
    } else {
        jQuery("#product_carousel .controls").hide();
    }
});

function updateProductCarousel() {
    var lastIndex   = 0,
        i           = 0,
        j           = 1,
        carouselObj = jQuery('#product_carousel .jcarousel'),
        propVal = '',
        imageName;

    for(i; i < this.hiddenProperties.length; i+=1){
        var propname = this.hiddenProperties[i]['propname'];
        if( propname == 'Sys_Num_Images'){
            lastIndex = parseInt(this.hiddenProperties[i]['propvalue']);
        }
    }

    // if Sys_Num_Images was not found in the hidden props, check the visible props
    if (lastIndex == 0 || lastIndex == NaN) {
        for(i = 0; i < this.properties.length; i+=1){
            var propname = this.properties[i]['propname'];
            if( propname == 'Sys_Num_Images'){
                lastIndex = parseInt(this.properties[i]['propvalue']);
            }
        }
    }

    var filename = this.image.split('/').pop();
    var img_name = get_name_of_file(filename);
    var extention = get_extention(filename);

    carouselObj.find('li').remove();

    if(lastIndex == 0 || lastIndex == NaN){
        jQuery("#product_carousel .controls").hide();

        var imageFilename = img_name + "." + extention;

        carouselObj.find('ul').append(
            render_img_template('images', imageFilename)
        );
    } else {

        for(var k=0; k < this.hiddenProperties.length; k+=1){
            var propname = this.hiddenProperties[k]['propname'];
            if( propname == 'Sys_Video_Image'){
                propVal = this.hiddenProperties[k]['propvalue'];
            }
        }
        if(propVal == ''){
            for(var k = 0; k < this.properties.length; k+=1){
                var propname = this.properties[k]['propname'];
                if( propname == 'Sys_Video_Image'){
                    propVal = this.properties[k]['propvalue'];
                }
            }
        }

        if(propVal != ''){
            var videoObj = jQuery(render_img_template('small', propVal));
            carouselObj.find('ul').append(videoObj);
            videoObj.find('a').click(function(event){
                event.preventDefault();
                jQuery('.yt-f-errMsg, .yt-t-errMsg, .yt-id-errMsg').each(function() {
                    jQuery(this).hide();
                });
                jQuery("#youtube-dialog").dialog("open");
            });
        }

        for(j; j <= lastIndex; j+=1){
            var imageFilename = img_name + ((j > 1) ? '-'+j : '') + "." + extention;
            carouselObj.find('ul').append(
                render_img_template('small', imageFilename)
            );
        }

        if(lastIndex > 4) {
            jQuery("#product_carousel .controls").show();
        }
    }
    carouselObj.jcarousel('reload');

    assignThumbsClick(propVal!=''? true:false);
};

function get_extention(filename) {
    var a = filename.split(".");
    if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
        return "";
    }
    return a.pop();
}

function get_name_of_file(filename) {
    var a = filename.split(".");
    if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
        return a.join('.');
    }
    return a.slice(0, -1).join('.');
}