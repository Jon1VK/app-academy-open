const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find('input');
    this.$ul = this.$el.find('.users');
    this.$input.on('input', this.handleInput.bind(this));
  }

  handleInput() {
    APIUtil.searchUsers(this.$input.val()).then(this.renderResults.bind(this));
  }

  renderResults(users) {
    this.$ul.empty();

    users.forEach((user) => {
      const $li = $('<li>');
      $li.appendTo(this.$ul);

      const $link = $('<a>');
      $link.prop('href', `/users/${user.id}`);
      $link.text('@' + user.username);
      $link.appendTo($li);

      if (user.followed != null) {
        const $button = $('<button>');
        $button.addClass('follow-toggle button');
        $button.appendTo($li);

        new FollowToggle($button, {
          userId: user.id,
          followState: user.followed ? 'followed' : 'unfollowed',
        });
      }
    });
  }
}

module.exports = UsersSearch;
