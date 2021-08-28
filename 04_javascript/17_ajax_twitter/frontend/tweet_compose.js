const APIUtil = require('./api_util');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.charsLeft = 140;
    this.$el.on('submit', this.submit.bind(this));
    this.$el.find('textarea').on('input', this.updateCharsLeft.bind(this));
    this.$el.find('.add-mention').on('click', this.newUserSelect.bind(this));
    this.$el
      .find('.user-mentions')
      .on('click', 'button', this.removeMentionedUser);
  }

  submit(event) {
    event.preventDefault();

    APIUtil.createTweet(this.$el.serializeJSON()).then(
      this.handleSuccess.bind(this)
    );

    this.$el.find(':input').prop('disabled', true);
  }

  handleSuccess(response) {
    this.$el.find(':input').prop('disabled', false);
    this.clearInput();
    $(this.$el.data('tweets-ul')).trigger('insert-tweet', [response, true]);
  }

  newUserSelect(event) {
    event.preventDefault();

    const $div = $('<div>');
    $div.appendTo(this.$el.find('.user-mentions'));

    const $select = $('<select>');
    $select.prop('name', 'tweet[mentioned_user_ids][]');
    $select.appendTo($div);

    const $removeMention = $('<button>');
    $removeMention.addClass('button');
    $removeMention.text('Remove');
    $removeMention.appendTo($div);

    window.users.forEach(({ id, username }) => {
      const $option = $('<option>');
      $option.val(id);
      $option.text(username);
      $option.appendTo($select);
    });
  }

  removeMentionedUser() {
    $(this).closest('div').remove();
  }

  clearInput() {
    this.$el.find(':input').not(':submit').val('');
    this.$el.find('.user-mentions').empty();
    this.updateCharsLeft();
  }

  updateCharsLeft() {
    this.charsLeft = 140 - this.$el.find('textarea').val().length;
    this.$el.find('.chars-left').text(this.charsLeft);
  }
}

module.exports = TweetCompose;
