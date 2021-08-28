/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
  followUser(id) {
    return Promise.resolve(
      $.ajax({
        method: 'POST',
        url: `/users/${id}/follow`,
        dataType: 'json',
      })
    );
  },

  unfollowUser(id) {
    return Promise.resolve(
      $.ajax({
        method: 'DELETE',
        url: `/users/${id}/follow`,
        dataType: 'json',
      })
    );
  },

  searchUsers(queryVal) {
    return Promise.resolve(
      $.ajax({
        method: 'GET',
        url: `/users/search`,
        dataType: 'json',
        data: { query: queryVal },
      })
    );
  },

  createTweet(data) {
    return Promise.resolve(
      $.ajax({
        method: 'POST',
        url: `/tweets`,
        dataType: 'json',
        data,
      })
    );
  },

  fetchTweets(maxCreatedAt) {
    return Promise.resolve(
      $.ajax({
        method: 'GET',
        url: '/feed',
        dataType: 'json',
        data: maxCreatedAt ? { max_created_at: maxCreatedAt } : {},
      })
    );
  },
};

module.exports = APIUtil;


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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


/***/ }),

/***/ "./frontend/infinite_tweets.js":
/*!*************************************!*\
  !*** ./frontend/infinite_tweets.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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


/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js");
const InfiniteTweets = __webpack_require__(/*! ./infinite_tweets */ "./frontend/infinite_tweets.js");

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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map