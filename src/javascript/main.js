"use strict";

var copyToClipboard = function copyToClipboard(str) {
  var el = document.createElement('textarea'); // Create a <textarea> element

  el.value = str; // Set its value to the string that you want copied
  el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px'; // Move outside the screen to make it invisible

  document.body.appendChild(el); // Append the <textarea> element to the HTML document

  var selected = document.getSelection().rangeCount > 0 // Check if there is any content selected previously
  ? document.getSelection().getRangeAt(0) // Store selection if found
  : false; // Mark as false to know no selection existed before

  el.select(); // Select the <textarea> content

  document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el); // Remove the <textarea> element

  if (selected) {
    // If a selection existed before copying
    document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
    document.getSelection().addRange(selected); // Restore the original selection
  }
};

var pluralize = function(count, noun, suffix = 's') {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`;
}
  


function togglePassword(input) {
  var x = input;
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function countdown(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      display.textContent =  pluralize(minutes, $(display).data('minute')) + " " + pluralize(seconds, $(display).data('second'));

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

$(function() {
  var buttonNames = ['Show options', 'Disable options']
  var createForm = $('form#createNode')

  // settings tooggle
  $(".settings-button").click(function(e){
    e.preventDefault();
    $(".settings-block").slideToggle(350, function(){
      var button = $('.settings-button div');
      if (button.text() === button.data('close')) {
        button.text(button.data('open'))
      } else {
        button.text(button.data('close'))
      }
    });
  });

  // read password tooggle
  $("#readWithPassword").click(function(e){
    var button = $(this);

    if (button.text() !== button.data('close')) {
      e.preventDefault();
      button.text(button.data('close'))
    }

    $(".slide-block").slideDown(350);
  });


  // create validate and submit
  createForm.validate({
    rules: {
      note: {
        required: true
      },
      password_repeat: {
        equalTo: "#password"
      }
    },
    submitHandler: function(form) {
      window.location = '/ready.html'
    }
  });

  // copy link
  $('#copyNote').on('click', function(){
    var textToCopy = $('#link').text();

    console.log(textToCopy)
    copyToClipboard(textToCopy);

    $('.tooltip-container').addClass('open');

    setTimeout(function(){
      $('.tooltip-container').removeClass('open');
    }, 1000)
  })

  $('#passToggleTrigger').on('click', function(){

    var input = $('#passToggle');
    var button = $('#passToggleTrigger');
    togglePassword(input[0])
    console.log('click 2', button.text());

    if (button.text() === button.data('close')) {
      button.text(button.data('open'))
    } else {
      button.text(button.data('close'))
    }
  })

  if ($('#countdown').length) {
    var fiveMinutes = 60 * 60,
    display = document.querySelector('#countdown');
  
    countdown(fiveMinutes, display);
  }
  
});