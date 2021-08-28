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
};

module.exports = APIUtil;
