const FollowToggle = require('./follow_toggle');

$(() => {
  $('.follow-toggle').each(function () {
    new FollowToggle(this);
  });
});
