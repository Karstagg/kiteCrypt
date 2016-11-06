$( document ).ready(function() {

	//this function skips the into animations on a click for kite crypt by changing the css classes for the animate elements
	$('body').click(function() {
		$('#kiteCrypt-title').removeClass("fade-in").addClass("skip-fade-in");
		$('#sign-up').removeClass("fade-in-2").addClass("skip-fade-in-2");
		$('#pulse').removeClass("pulse").addClass("pulse-now");
		$("#slogan").removeClass("fade-in-out").addClass("skip-fade-in-out");
	});
});
