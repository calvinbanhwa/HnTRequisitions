/* console shim */
(function(){
	var f = function(){};
	if(!window.console){
		window.console = {
			log:f, info:f, warn:f, debug:f, error:f
		};
	}
}());

/* google analytics shim */
(function(){
	if(!window.ga){
		window.ga = function(){};
	}
}());

/* animate navbar */
$(window).scroll(function() {
	if ($(document).scrollTop() > 50) {
		$('.navbar-inverse').addClass('nav_scrolled');
	} else {
		$('.navbar-inverse').removeClass('nav_scrolled');
	}
});

/* animate nav btn mobile */

$('.navbar-toggle').click(function(){
	$('.navbar-toggle').toggleClass('navOpened');
})

$('.navOpened').click(function(){
	$('.navbar-toggle').removeClass('navOpened');
})


// detect svg so we don't have to rely on modernizr
function supportsSVG(){
	return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
}
// detect touch
function isTouch(){
	return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

// HORRIBLE HACK, FIX IF YOU WANT.
function getParameterByName(name) { 
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); 
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); 
} 

var token = getParameterByName('token'); 
if(token && document.getElementById('token'))
	document.getElementById('token').value = token;


// Modified http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
// Only fires on body class (working off strictly WordPress body_class)

(function($) {

var FTjs = {
	// All pages
	common: {
		init: function() {

			// get started now form
			validatordefaults();
			getstartednowform();

			// popovers...if we have a manual trigger, show on hover, hide on click
			$('[rel=popover]').each(function(){

				// our initial element
				var $elm = $(this);

				// if we have a manual trigger, handle show with mouseenter and hide with mouseleave on the popover itself
				if($elm.data('trigger') === 'manual'){

					// initialize popover and create the show event
					$elm
						.popover()
						.on('mouseover mouseenter', function(){
							$elm.popover('show');
						});

					// add a live event on the parent, watching for the yet-to-be-created popover div
					var $parent = $elm.parent();
					$parent.on('mouseleave', 'div.popover', function(){
						$elm.popover('hide');
					});
					
				}else{
					$elm.popover();
				}
			});

		},
		finalize: function() {
			// nothing
		}
	},

	// forgot password page
	forgot_password: {
		init: function(){
			forgotform();
		}
	},

	// invited-by-a-friend
	invited_by_a_friend: {
		init: function(){
			signupform();

			/*
			// look for a token in the URL
			var $_GET = {};

			// parse the URL
			document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function(){
				function decode(s){
					return decodeURIComponent(s.split('+').join(' '));
				}
				$_GET[decode(arguments[1])] = decode(arguments[2]);
			});
			var token = $_GET.token;
			*/

			// sanity check
			var t = $('#token').val();
			if( ! t || typeof(t) === 'undefined'){
				$('#signup').addClass('error');
				$('#signup p.errormsg')
					.html('<b>Oops!</b> Something went wrong with your invitation. Try clicking on the link in your email again.')
					.addClass('icon-minus-circled');
				return false;
			}
		}
	},
	login: {
		init: function(){
			console.log('login');
			loginform();
		}
	},
	classic: {
		init: function(){
			console.log('classic');
			loginform();
		}
	},
	signup: {
		init: function(){
			signupform();

			/*
			// look for a token in the URL
			var $_GET = {};

			// parse the URL
			document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function(){
				function decode(s){
					return decodeURIComponent(s.split('+').join(' '));
				}
				$_GET[decode(arguments[1])] = decode(arguments[2]);
			});
			var token = $_GET.token;

			// sanity check
			if( ! token || typeof(token) === 'undefined'){
				$('#signup').addClass('error');
				$('#signup p.errormsg')
					.html('<b>Oops!</b> Something went wrong with your invitation. Try clicking on the link in your email again.')
					.addClass('icon-minus-circled');
				return false;
			}

			// fill out the token field
			$('form#ft-signup input[name=token]').val(token);
			*/
		}
	},
};

var UTIL = {
	fire: function(func, funcname, args) {
		var namespace = FTjs;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
			namespace[func][funcname](args);
		}
	},
	loadEvents: function() {

		UTIL.fire('common');

		$.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
			UTIL.fire(classnm);
		});

		UTIL.fire('common', 'finalize');

	}
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

