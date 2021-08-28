const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');
const InfiniteTweets = require('./infinite_tweets');

$(() => {
  $('.follow-toggle').each(function () {
    new FollowToggle(this);
  });

  $('.users-search').each(function () {
    new UsersSearch(this);
  });

  $('.tweet-compose').each(function () {
    new TweetCompose(this);
  });

  $('.infinite-tweets').each(function () {
    new InfiniteTweets(this);
  });
});
