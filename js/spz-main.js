//Simple Slideshow
var $currentItem;
var totalItems;
var timer;
var interval = 2500;

//variables for tab dots
var $currentPage;
var totalPage;
var pageDots;


$( document ).ready( setupSlideshow );

function setupSlideshow() {
	$currentItem = $( '#featured-container li:first-child' );
	$currentItem.fadeIn(1000);

	totalItems = $( '#featured-container li' ).length;
	timer = setTimeout( nextItem, interval );

	//Binding Prev and Next buttons
	$( '#featured-next' ).on( 'click', function(){  clearTimeout( timer ); nextItem(); clearTimeout( timer );} );
	$( '#featured-prev' ).on( 'click', function(){  clearTimeout( timer ); prevItem(); clearTimeout( timer );} );

	//Preparing for page dots
	$currentPage = $('#page-dot li:first-child');
	totalPage = $('#page-dot li').length;

	//Setting up the pagination click events for each of the dots
	pageDots = $('#page-dot img');


	//for automatically switching the dots when the slideshow changes
	for ( i=0; i < pageDots.length ; i++) {

		currentDot = pageDots[i];
		
		currentDot.onclick = function(e){  
			e.stopPropagation(); 
			clearTimeout( timer ); 
			switchToItem(this); 
			return false;

		} ;
	}
}

function nextItem() {
	$currentItem.fadeOut();
	$currentPage.removeClass("page-dot-selected"); //for the dots

	if ( $currentItem.index() + 1 < totalItems ) {
		$currentItem = $currentItem.next();
		$currentPage = $currentPage.next(); //for the dots
	} else {
		$currentItem = $( '#featured-container li:first-child' );
		$currentPage = $( '#page-dot li:first-child' ); //for the dots
	}

	$currentItem.fadeIn();
	$currentPage.addClass("page-dot-selected"); //for the dots
	timer = setTimeout( nextItem, interval );
}

function prevItem() {
	$currentItem.fadeOut();
	$currentPage.removeClass("page-dot-selected"); //for the dots
	
	if ( $currentItem.index() - 1 > -1 ) {
		$currentItem = $currentItem.prev();
		$currentPage = $currentPage.prev(); //for the dots
	} else {
		$currentItem = $( '#featured-container li:last-child' );
		$currentPage = $( '#page-dot li:last-child' ); //for the dots
	}
	
	$currentItem.fadeIn();
	$currentPage.addClass("page-dot-selected"); //for the dots
	timer = setTimeout( prevItem, interval );
}

//When clicking on the nav page dots
function switchToItem(thisImg) {
	itemIndex = pageDots.index(thisImg);

	$currentItem.fadeOut();
	$currentPage.removeClass("page-dot-selected");

	//Changing current page to the selected dot
	$currentItem = $( $( '#featured-container li' )[itemIndex] );
	$currentPage = $( $( '#page-dot li' )[itemIndex] );

	$currentPage.addClass("page-dot-selected");
	$currentItem.fadeIn();

	timer = setTimeout( nextItem, interval );
}


//************************************************//
//Form Validation
var requiredFields = [ "name", "email", "phone", "message" ];

function checkFeedback( theForm ) {
  for ( i in requiredFields ) {
    var fieldName = requiredFields[ i ];
    var theField = theForm[ fieldName ];
    if ( !theField.value ) {
		theField.style.border = "1px solid red";
      	var emptyFields = true;
    }
  }

  //email validation
  if ( !checkEmail(theForm['email'].value) ) {
  		theForm['email'].style.border = "1px solid red";
  		var emptyFields = true;
  }

  if ( !emptyFields ) {
    displayMessage(0);
    //theForm.submit();
  } else {
  	  displayMessage(2);
	}

  resetBtn = $('button:reset')[0];  //Bind the reset button onclick event
  resetBtn.onclick = function() { 
  	for ( i in requiredFields ) {
  		var fieldName = requiredFields[ i ];
   		var theField = theForm[ fieldName ];
  		clearFormat(theField);
  		theField.value = "";
  	}
  };
}

function checkEmail(theEmail) {
	console.log(/\S+@\S+/.test(theEmail));
	return /\S+@\S+/.test(theEmail);
	//A regular expression to do a basic test on validation of email addresses. 
	//It detects string@string as a valid email.=, and returns true/false.
}

//Validate the Subcribe to e-Newsletter Form
function validateSubscribe(theForm) {
	var theEmail = theForm['subscribenews'];
	if ( checkEmail(theEmail.value) == true) {
		displayMessage(0);
		console.log(theEmail);
		theEmail.value = "";
		//theForm.submit();
		return false;
	} else {
		theEmail.style.border = "1px solid red";
		displayMessage(1);
		return false;
	}
}

//Function to display error message banner and removes it automatically
function displayMessage(MsgID) {
	//initialise
	clearTimeout(timer);
	$('#errorMessage').remove();

	errorMessage = document.createElement("div");
	errorMessage.id = "errorMessage";	//assign an ID
	document.getElementById("footer").appendChild( errorMessage );
	//now, depending on MsgID, will output different messages
	switch(MsgID) {
		case 0: errorMessage.appendChild(document.createTextNode("Submitted, thanks for your response.")); break;
		case 1: errorMessage.appendChild(document.createTextNode("Please fill in a valid email.")); break;
		case 2: errorMessage.appendChild(document.createTextNode("Please check the highlighted fields in feedback form.")); break;
		case 3: errorMessage.appendChild(document.createTextNode("The shopping cart is currently not available, please check back later.")); break;
		case 4: errorMessage.appendChild(document.createTextNode("There's an unknown error, please try again later.")); break;
		}

	//$(errorMessage).hide().fadeIn(500); //fade in version
	$(errorMessage).animate({bottom:"0px"}, 600);	//slide up version, please see CSS for tuning
	timer = setTimeout(function() {		//setting a timer to clear the message
		empty = document.getElementById("errorMessage");
  		$(empty).fadeOut(500, function() 
  			{ $(this).remove(); }	);
  		}, 3500 );
}

//Function to clear all formatting of a field
function clearFormat(field) {
	field.removeAttribute("style");
}

//**** Cart Message
$( document ).ready( bindCart );

function bindCart() {
	CheckOutBtn = $('#carts button')[0];  
  	CheckOutBtn.onclick = function() {
  	//alert("The shopping cart is currently under construction, please check back with us later. :)");
  	displayMessage(3);
  	}
}

//********Fancy FAQ
$( document ).ready( bindFAQ );

function bindFAQ() {
	//Getting the Questions and Answers ready
	$faqs = $('.faq h4');
	$answers = $('.faq p');

	$faqs.each(function( counter ) {
		//Bind the question clicks and toggle CSS:display of answers
		$faqs[counter].onclick = function() { 
				faqindex = $faqs.index(this);
				$($answers[faqindex]).slideToggle(400);
		};
	} );
}

//*******Fancy Lookbook
$( document ).ready( fancyLookbook );

function fancyLookbook() {
	$lookbooknavs = $('#lookbook-nav li');
	$collections = $('#lookbook-content .lookbook');

	$($collections[0]).fadeIn(1000); 
	$($lookbooknavs[0]).addClass("lookbook-nav-selected");
	//set selection to the first tab

	$collections.each(function (lookbookNavIndex) {
		//binding click events on each tabs for lookbook
		$lookbooknavs[lookbookNavIndex].onclick = function() { 
			//switching tabs
			$($collections[lookbookNavIndex]).siblings(".lookbook").fadeOut(400);
			$($collections[lookbookNavIndex]).fadeIn(400); 

			$($lookbooknavs[lookbookNavIndex]).siblings("li").removeClass("lookbook-nav-selected");
			$($lookbooknavs[lookbookNavIndex]).addClass("lookbook-nav-selected");

		};

	});

}
