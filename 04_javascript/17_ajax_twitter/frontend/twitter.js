const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');

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
});
