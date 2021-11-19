/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  //Render Tweets Function Starts here..
  const renderTweets = tweets => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };
  // Function to ensure tweet text is safe
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //Create Tweet Function to Create dynamically html elements  
  const createTweetElement = function(tweetObj) {
    const createdTime = timeago.format(tweetObj.created_at);;
    const tweetPage = $(`
      <article>
        <header>
          <span class="username"><img class="profileimg" src="${tweetObj.user.avatars}">${tweetObj.user.name}</span>
          <span class="userid">${tweetObj.user.handle}</span>
        </header>
        <p class="tweet-text">${escape(tweetObj.content.text)}</p>
        <footer>
          <span>${createdTime}</span>
          <span class="icons"><i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
    return tweetPage;
  };
  
  const loadTweets = () => {
    //make a request to /tweets
    //receive array of tweets as JSON
    $.ajax('/tweets', { method: 'GET' })
    .then(tweetsHTML => {
      $('#tweets-container').empty();
      renderTweets(tweetsHTML);
    });
    $('#error').empty();
    $('#error').hide();
    $('.new-tweet').hide();
  };

  loadTweets();

  $("#posttweet").submit(function(event) {
    const charCount = $(event.target.text).serialize().length - 5;
    $('#error').empty();
    if ( $('#error').is(":hidden") ) {
      $('#error').empty();
    } else {
      $('#error').hide();
    }
    event.preventDefault();
    if (errorMsg(charCount)) {
      return $('#error').append(errorMsg(charCount)).slideDown("fast");
      // return $('#error').append(errorMsg(charCount));
    } else {
      $('#error').hide();
    }
    addNewTweet(event);
    $(this).find(".counter").text(140);
  });

  // Slides down the new tweet section and sets focus when clicking on Nav bar ("Write a new tweet")
  $("#writenew").on("click", function() {
    $('.new-tweet').slideDown()
    $('#tweet-text').focus();
  })

  // Slides up the new tweet function
  $("#logo").on("click", function() {
    $('.new-tweet').slideUp()
  })

  // Scrolls to the top of the page
  $("#up-arrow").on("click", function() {
    $("html, body").animate({scrollTop: 0});
  })

  //Create new Tweet that is called within the Submit Button
  const addNewTweet = function(event) {
    const $tweetText = $(event.target.text).serialize();
    $.post('/tweets', $tweetText).then(() => {
      $('#tweet-text').val(''); //clears textarea
      loadTweets();
    })
  };

  // Returns an error message depending on character count of textarea
  const errorMsg = function(num) {
    let message = "";
    if (!num)  {
      message = "You forgot to enter some text!"
    } else if (num > 140) {
      message = "Please shorten your thoughts to 140 characters or less!";
    }
    if (message)  {
      return `<span><i class="fas fa-exclamation-triangle"></i></span><span>${message}</span><span><i class="fas fa-exclamation-triangle"></i></span>`;
    }
  };

  // Function to change opacity of navbar while scrolling
  const changeNavOpacity = function() {
    let y2 = $(this).scrollTop();
    let opacity = 1;
    if (windowsize < 1024) {
      if (y2 < 400) {
        opacity = 1 - y2 / (800);
      } else {
        opacity = 0.5;
      }
    } else {
      opacity = 1;
    }
    $('.fadenav').css('opacity', opacity);
  };

  // Change navbar opacity and up-arrow opacity upon scrolling
  $(window).bind('scroll', changeNavOpacity, function() {
    let y = $(this).scrollTop();
    if (y > 50) {
      $('#up-arrow').fadeIn();
    } else  {
      $('#up-arrow').fadeOut();
    }
  });

  // update navbar opcaity on resize
  let windowsize = $(window).width();
  $(window).bind('resize', function() {
    windowsize = $(window).width();
    if (windowsize < 1024) {
      $('.fadenav').css('opacity', 1);
    }
    $(window).bind('scroll', changeNavOpacity);
  });
});

