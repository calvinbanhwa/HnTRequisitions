// validator password method
$.validator.addMethod('password', function(value, element){
	return this.optional(element) || value.length >= 6 && /\d/.test(value) && /[a-z]/i.test(value);
}, 'At least 6 characters, with at least one number.');

// get started now form, on almost all pages
// called from _main.js
var getstartednowform = function(){
	$('form#ft-get-started').validate({
		rules: {
			email: {
				required: true,
				email: true
			}
		}
	});
	$('form#ft-get-started button').on('click', function(){
		$('form#ft-get-started').trigger('submit');
	});
};

// login form specific setup
// called from _main.js
var loginform = function(){
	$('form#ft-login').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true
			}
		}
	});
	$('form#ft-login button').on('click', function(){
		$('form#ft-login').trigger('submit');
	});
};

// signup form specific setup
// called from _main.js
var signupform = function(){
	$('form#ft-signup').validate({
		rules: {
			first: {
				required: true,
				minlength: 2
			},
			last: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			password: {
				password: true
			},
			'password-repeat': {
				equalTo: '#password'
			}
		}
	});

	// look for an email parameter
	var e = getParameterByName('email');
	if(e)
		$('form#ft-signup #email').val(e);
};

// forgot password form specific setup
// called from _main.js
var forgotform = function(){
	$('form#ft-forgot').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				password: true
			},
			'password-repeat': {
				password: true,
				equalTo: '#forgot-password'
			}
		},
		messages: {
			email: {
				required: 'We need your email address to send you a link to reset your password.',
				email: 'This doesn’t look like a valid email address.'
			},
			password: {
				required: 'Your password must be at least 6 characters long and include at least one number.'
			},
			'password-repeat': {
				required: 'Your passwords must match.'
			}
		}
	});
	$('form#ft-forgot button').on('click', function(){
		$('form#ft-forgot').trigger('submit');
	});
};

// set the submission bit to ensure we don't try to submit more than once
var submitting = false;

// the core validator setup and handling for all forms we support
var validatordefaults = function(){
	$.validator.setDefaults({
		debug: false,
		onkeyup: false,
		//onfocusout: true,
		validClass: 'icon-ok-circled',
		errorClass: 'icon-minus-circled',
		focusCleanup: true,

		showErrors: function(errorMap, errorList){
			console.log('showErrors', errorList);

			// if we have a zero-element errorList, we have no errors
			if( ! errorList[0]){
				return;
			}

			// highlight the error on the invalid element...should be handled by the highlight function
			var $elm = $(errorList[0].element);
			console.log('showErrors', errorList[0].element);

			// set up the enclosing element
			$elm
				.parent()
				.removeClass('has-success')
				.addClass('has-error');

			// set up the popover
			$elm
				.attr('data-content', errorList[0].message)
				.popover('show');
			console.log('popover', $elm[0]);
		},

		highlight: function(element){
			$(element)
				.parent()
				.removeClass('has-success')
				.addClass('has-error');
		},

		unhighlight: function(element){
			// kill the popover
			$(element)
				.popover('destroy')
				.parent()
				.removeClass('has-error')
				.addClass('has-success');
		},

		invalidHandler: function(event, validator){
			console.log('invalidHandler', event, validator);
			var $err = $('p.errormsg', event.target);
			$err
				.addClass('icon-minus-circled')
				.html('<b>Oops!</b> Please try again.');
		},

		submitHandler: function(form){
			console.log('submitHander for', form);

			// if we're submitting, don't do anything else
			if(submitting) return false;

			// now that we're here, we set submitting to true
			submitting = true;

			// save the current url
			var loc = document.location,		
				handler = $(form).attr('id'),				// determine what method to run
				apiurl = window.FT.api+'/ftapi/ftapi';		// the base url of the ftapi server...set in lib/ft.api.php

			// add manual parameters
			var apisuffix = (loc.hash.length > 0) ? '&' + loc.hash.replace('#', '') : '';

			// grab the submit button
			var $submit = $('button[type=submit]', form);
			$submit.button('loading');

			// grab the error element
			var $err = $('p.errormsg', form);
			if( ! $err[0]) $err = $('<p class="errormsg">').appendTo($('div.info', form));

			// hide it
			$err.hide();

			// clear errors from prior form submissions
			$err.removeClass('icon-ok-circled icon-minus-circled');

			// this is the handler block for each type of form we support:
			// + Login
			// + Signup
			// + Forgot
			switch(handler){

				// login
				case 'ft-login':
					console.log('ft-login', form);
					// hide the forgot link, because it's irrelevant at the moment
					//$('p.forgot', form).fadeOut();

					// submit the form
					$.ajax({
						url: apiurl,
						jsonp: 'jsonp',
						type: 'GET',
						dataType: 'jsonp',
						data: $(form).serialize() + apisuffix
					})
						.always(function(){
							$submit.button('reset');
							//form.reset();
							submitting = false;
						})
						.fail(function(xhr, status, err){
							// show the forgot link
							$('p.forgot', form).fadeIn();

							// show the error
							$err
								.addClass('icon-minus-circled')
								.html('<b>Oops!</b> We could not log you in. <small>(' + err + ')</small>')
								.show();
						})
						.done(function(r){
							// if we have a malformed response or the result is ERROR
							if( ! r.result || r.result === 'ERROR'){
								// show the forgot link
								$('p.forgot', form).fadeIn();

								// if the result is malformed, we won't have a message from the server, so default it
								var msg = r.error ? r.error.text : '<b>Oops!</b> We couldn’t find an account with those credentials.';

								// show the error
								$err
									.addClass('icon-minus-circled')
									.html(msg)
									.show();

							// otherwise, it's a successful submission...successful logins do not have any text from the server
							}else{

								// show the success message
								$err
									.addClass('icon-ok-circled')
									.html('<b>Success!</b> Redirecting you to your documents...')
									.show();

								// redirect to the location specified in the response
								window.location.href = r.next;
							}
						});
					break;

				// get started now
				case 'ft-get-started':
					console.log('ft-get-started', form);

					var url = document.location.protocol + '//' + document.location.host + '/signup/?email=' + encodeURIComponent($('#home-email').val());
					document.location.href=url;
					break;

				// create account
				case 'ft-signup':
					console.log('ft-signup', form);

					$.ajax({
						url: apiurl,
						jsonp: 'jsonp',
						type: 'GET',
						dataType: 'jsonp',
						data: $(form).serialize() + apisuffix
					})
						.always(function(){
							$submit.button('reset');
							//form.reset();
							submitting = false;
						})
						.fail(function(xhr, status, err){
							// show the error
							$err
								.addClass('icon-minus-circled')
								.html('<b>Oops!</b> We could not complete signup. <small>(' + err + ')</small>')
								.show();
						})
						.done(function(r){
							// if we have a malformed response or the result is ERROR
							if( ! r.result || r.result === 'ERROR'){

								// if the result is malformed, we won't have a message from the server, so default it
								var msg = r.error ? r.error.text : '<b>Oops!</b> We were unable to create your account.';

								// deal with error message
								$err
									.addClass('icon-minus-circled')
									.html(msg)
									.show();

							// otherwise, it's a successful submission
							}else{
								// add the success class to info
								// this hides the form behind a big orange box, and places the response from the server inside that box
								$('div.info', form).addClass('success');

								// add success message to the error element
								$err
									.removeClass('icon-minus-circled')
									.removeClass('icon-ok-circled')
									//.html('<span style="font-size: 3em; font-weight: 200;">:)</span><span>Almost finished.</span><span>To complete the subscription process, please click the link in the email we just sent you.</span>')
									.show();

								// record event in analytics, as defined in the analytics Goal:
								// category = Signup
								// action = Signup Box
								// Label = FileThis WebApp
								// nonInteraction = 1 so that this event won't count against the site's bounce rate
								// the page is set to the pathname so that we can tell what page people signed up from
								//var gaObj = window.__gaTracker ? window.__gaTracker : window.ga;
								//gaObj('send', 'event', 'Signup', 'Signup Box', 'FileThis WebApp', null, {'nonInteraction': 1, 'page': document.location.pathname});

								// if we have a "next", redirect to it
								if(r.next){
									document.location.href = r.next;
								}else{
									// redirect to the success page
									var url = document.location.protocol + '//' + document.location.host + '/signup/success/';
									document.location.href = url;
									return false;
								}
							}

							// now show the info block
							$('div.info', form).fadeIn();
						});
					break;

				// handle forgot logic ... not done yet
				case 'ft-forgot':
					$.ajax({
						url: apiurl,
						jsonp: 'jsonp',
						type: 'POST',
						dataType: 'jsonp',
						data: $(form).serialize() + apisuffix
					})
						.always(function(){
							// reset the submit button so the user can try again
							$submit.button('reset');
							// turn off submitting
							submitting = false;
						})
						.fail(function(xhr, status, err){
							// show the error
							$err
								.addClass('icon-minus-circled')
								.html('<b>Oops!</b> We could not complete your request at this time. <small>(' + err + ')</small>')
								.show();
						})
						.done(function(r){
							// if we have a malformed response or the result is ERROR
							if( ! r.result || r.result === 'ERROR'){

								// if the result is malformed, we won't have a message from the server, so default it
								var msg = r.error ? r.error.text : '<b>Oops!</b> Password reset failed. Please try again.';

								// deal with error message
								$err
									.addClass('icon-minus-circled')
									.html(msg)
									.show();

							// otherwise, it's a successful submission
							}else{

								// add success message to the error element
								$err
									.removeClass('icon-minus-circled')
									.addClass('icon-ok-circled')
									.html('Almost finished. We have emailed further instructions to you. Please check your email and follow those instructions.')
									.show();
							}
						});
					break;
			}
			return false;
		}
	});
};
