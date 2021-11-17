/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = tweets => {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

const createTweetElement = tweetObj => {
  const createdTime = timeago.format(tweetObj.created_at);
  const tweetPage = $(`
    <article>
      <header>
        <span class="username"><img class="profileimg" src="${tweetObj.user.avatars}"> ${tweetObj.user.name}</span>
        <span class="userid">${tweetObj.user.handle}</span>
      </header>
      <p>${tweetObj.content.text}</p>
      <footer>
        <span>${createdTime}</span>
        <span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
      </footer>
    </article>
  `);
  return tweetPage;
};


$(document).ready(function() {
  renderTweets(data);  
});