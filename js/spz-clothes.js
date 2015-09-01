//************************************************//
//Displaying fancybox for individual clothing pages

$(document).ready(function() {
	$('.clothes a').fancybox( 
	{	type: "image",
		autoScale: true,
		padding:0,
		closeBtn:true
	}	);

	$('#add-to-cart')[0].onclick = function() { addcart();};
	$('#cart a')[0].onclick = function() { return false;};
});

var totamt = 0;

function addcart() {
	//EXPERIMENTAL, COSMETIC ONLY, CART NOT FUNCTIONING AT ALL
	displayMessage(3);

	//fancy jump animation
	$($('#cart a')[0]).css({top:'0',position:'relative'});
	$($('#cart a')[0]).animate( { top:'22'}, 10, function() { 

		setTimeout(function(){

			$($('#cart a')[0]).animate( { top:'0'}, 20);

		}, 150);
		
	});
	
	//Increment quantities
	($('#cart a')[0]).innerHTML = "Cart (" + ($('.cart-items').length + 1) + ")";
	($('#cart p')[0]).innerHTML = "Current Items: " + ($('.cart-items').length + 1);

	//Adding current page items
	cartitem = document.createElement("div");
	cartitem.className = "cart-items";
	itemtext = $($('h3')[1]).text() + " - " + $($('.price')[0]).text() ;
	cartitem.appendChild(document.createTextNode(itemtext));
	document.getElementById("carts").appendChild( cartitem ); 

}