
document.addEventListener('DOMContentLoaded', function(event) {
  // console.log('The DOM is loaded!');
});

const alertMe = () => {
  alert("Hello!");
  // $("#blackBox").hide();
};

const checkChar = function() {
  const textboxInput = this;
  console.log(this);
  console.log(textboxInput.value);
}
const checkCharLength = function() {
  const charLimit = 140;
  const textboxLength = this.value.length;
  const charLeft = charLimit - textboxLength;
  $('counter')
  console.log(charLeft);
}


$(document).ready(function() {
  const charLimit = 140;
  $('#tweet-text').on('input', function(event) {
    const charLeft = charLimit - $(this).val().length;
    if (charLeft < 0) {
      $(this).parentsUntil(".new-tweet")
      .find(".counter")
      .addClass('counterMinus');
    } else {
      $(this).parentsUntil(".new-tweet")
      .find(".counter")
      .removeClass('counterMinus');
    }
    $(this).parentsUntil(".new-tweet")
      .find(".counter")
      .text(charLeft);
  });
});
