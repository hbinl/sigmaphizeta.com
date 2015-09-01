//************************************************//
//Displaying fancybox for Maps in stores.html

$(document).ready(function() {
	$('#stores-list a').fancybox( 
	{	type: 'iframe',
		width:500,
		height:500,
		padding:10,
		closeBtn:true
	}	);
});