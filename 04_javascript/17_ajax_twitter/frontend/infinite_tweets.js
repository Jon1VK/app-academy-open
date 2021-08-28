const APIUtil = require('./api_util');

class InfiniteTweets {
  constructor(el) {
    this.maxCreatedAt = null;
    this.$el = $(el);
    this.$el.find('button').on('click', this.fetchTweets.bind(this));
    this.$el
      .find('#feed')
      .on('insert-tweet', (event, ...args) => this.insertTweet(...args));
    this.fetchTweets();
  }

  fetchTweets() {
    APIUtil.fetchTweets(this.maxCreatedAt).then(this.insertTweets.bind(this));
  }

  insertTweets(tweets) {
    tweets.forEach((tweet) => {
      this.insertTweet(tweet);
    });

    if (tweets.length < 20) {
      this.$el.find('button').after('<p>No more tweets<p>');
      this.$el.find('button').remove();
    }

    if (tweets.length > 0) {
      this.maxCreatedAt = tweets[tweets.length - 1].created_at;
    }
  }

  insertTweet(tweet, prepend = false) {
    const $li = $('<li>');
    $li.addClass('tweet');

    if (prepend) {
      $li.prependTo(this.$el.find('.tweets'));
    } else {
      $li.appendTo(this.$el.find('.tweets'));
    }

    const date = new Date(tweet.created_at);
    const $date = $('<time>');
    $date.text(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    $date.appendTo($li);

    const $link = $('<a>');
    $link.prop('href', `/users/${tweet.user_id}`);
    $link.text('@' + tweet.user.username);
    $link.appendTo($li);

    const $content = $('<p>');
    $content.text(tweet.content);
    $content.appendTo($li);

    $li.append('<span>Mentions</span>');
    const $mentions = $('<ul>');
    $mentions.appendTo($li);

    tweet.mentions.forEach((mention) => {
      const $mentionListItem = $('<li>');
      $mentionListItem.addClass('mention');
      $mentionListItem.appendTo($mentions);

      const $mentionLink = $('<a>');
      $mentionLink.prop('href', `/users/${mention.user_id}`);
      $mentionLink.text('@' + mention.user.username);
      $mentionLink.appendTo($mentionListItem);
    });
  }
}

module.exports = InfiniteTweets;
