'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
    
    var projectEndpoint = "http://localhost:3000/project/"+idNumber;
    console.log(projectEndpoint);
    
    $.get(projectEndpoint, addProject);
}

function addProject(res) {
    console.log(res);
    var idNumber = res['id'];
    console.log("#"+idNumber+" .details");
    var htmlString = '<img src="' + res['image'] + '" class="detailsImage">' + '<p>' + res['title'] + '</p>' + '<p><small>' + res['date'] + '</small></p>' + res['summary'];
    console.log(htmlString);
    var divS = $("#project"+idNumber+" .details");
    divS.html(htmlString);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
    
    $.get('http://localhost:3000/palette', paletteEndpoint);
}

function paletteEndpoint(res) {
    
    var colors = res['colors']['hex'];
    
    $('body').css('background-color', colors[0]);
    $('.thumbnail').css('background-color', colors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
    $('p').css('color', colors[3]);
    $('.project img').css('opacity', .75);
}
