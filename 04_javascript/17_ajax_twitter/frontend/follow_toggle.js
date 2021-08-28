const APIUtil = require('./api_util');

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = this.$el.data('follow-state') || options.followState;
    this.$el.on('click', this.handleClick.bind(this));
    this.render();
  }

  render() {
    this.$el.text(this.isfollowing() ? 'Unfollow!' : 'Follow!');
  }

  isfollowing() {
    return this.followState == 'followed';
  }

  toggleFollowState() {
    this.followState = this.isfollowing() ? 'unfollowed' : 'followed';
  }

  handleClick(event) {
    event.preventDefault();
    this.$el.prop('disabled', true);

    if (this.isfollowing()) {
      APIUtil.unfollowUser(this.userId)
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    } else {
      APIUtil.followUser(this.userId)
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }
  }

  handleSuccess() {
    this.$el.prop('disabled', false);
    this.toggleFollowState();
    this.render();
  }

  handleError() {
    this.$el.prop('disabled', false);
  }
}

module.exports = FollowToggle;
