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
    const avatar = tweetObj.user.avatars;
    const username = tweetObj.user.name;
    const handle = tweetObj.user.handle;
    const text = tweetObj.content.text;
    // $("p.tweet-text").text(tweetObj.content.text);
    const createdTime = timeago.format(tweetObj.created_at);;
    if (typeof tweetObj !== 'object') {
      console.log('not an object',tweetObj);
    }
    const tweetPage = $(`
      <article>
        <header>
          <span class="username"><img class="profileimg" src="${avatar}">${username}</span>
          <span class="userid">${handle}</span>
        </header>
        <p class="tweet-text">${escape(text)}</p>
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
  };

  loadTweets();

  $("#posttweet").submit(function(event) {
    const charCount = $(event.target.text).serialize().length - 5;
    event.preventDefault();
    if (!charCount)  {
      alert("Please enter something");
      return;
    } else if (charCount > 140) {
      alert("Please shorten your thoughts to 140 characters or less!");
      return;
    }
    addNewTweet(event);
    $(this).find(".counter").text(140);
  });
  
  //Create new Tweet that is called within the Submit Button
  const addNewTweet = function(event) {
    const $tweetText = $(event.target.text).serialize();
    $.post('/tweets', $tweetText).then(() => {
      console.log("post to tweets", $tweetText);
      // $('#tweets-container').prepend(createTweetElement($tweetText));
      $('#tweet-text').val(''); //clears textarea
      $('#tweets-container').empty();
      loadTweets();
    })
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