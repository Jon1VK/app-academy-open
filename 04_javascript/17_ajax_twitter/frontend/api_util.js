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
