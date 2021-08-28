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

$(() => {
  $('.follow-toggle').each(function () {
    new FollowToggle(this);
  });

  $('.users-search').each(function () {
    new UsersSearch(this);
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map