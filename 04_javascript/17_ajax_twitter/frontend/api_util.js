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
