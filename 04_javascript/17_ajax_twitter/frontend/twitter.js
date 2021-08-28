const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');

$(() => {
  $('.follow-toggle').each(function () {
    new FollowToggle(this);
  });

  $('.users-search').each(function () {
    new UsersSearch(this);
  });
});
