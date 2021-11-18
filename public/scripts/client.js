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
          <span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
    return tweetPage;
  };
  
  const loadTweets = () => {
    //make a request to /tweets
    //receive array of tweets as JSON
    $.ajax('/tweets', { method: 'GET' })
    .then(renderTweets);
    $('#error').empty();
    $('#error').hide();
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
      return $('#error').append(errorMsg(charCount)).slideDown("slow");
      // return $('#error').append(errorMsg(charCount));
    } else {
      $('#error').hide();
    }
    addNewTweet(event);
    $(this).find(".counter").text(140);
  });
  
  //Create new Tweet that is called within the Submit Button
  const addNewTweet = function(event) {
    const $tweetText = $(event.target.text).serialize();
    $.post('/tweets', $tweetText).then(() => {
      $('#tweet-text').val(''); //clears textarea
      $('#tweets-container').empty();
      loadTweets();
    })
  };

  const errorMsg = function(num) {
    let message = "";
    if (!num)  {
      message = "You forgot to enter some text!"
    } else if (num > 140) {
      message = "Please shorten your thoughts to 140 characters or less!";
    }
    if (message)  {
      return `<i class="fas fa-exclamation-triangle"></i> ${message} <i class="fas fa-exclamation-triangle"></i>`;
    }
  };

  // $("#writenew").click(function() {
    // const newTweetPos = $("[name='" + $(this).attr('href').replace("#", '') + "']").position();
    // const tweetsTop = $('article').first().scrollTop();
    // console.log(`new: ${newTweetPos} tweets: ${tweetsTop}`);
  //   window.scroll({
  //     top: 0,
  //     behavior: "smooth"
  //   });
  // });
});