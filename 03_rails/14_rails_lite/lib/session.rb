require 'json'

class Session
  COOKIE_NAME = '_rails_lite_app'
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    @cookie = req.cookies[COOKIE_NAME] ? 
      JSON.parse(req.cookies[COOKIE_NAME]) : {}
  end

  def [](key)
    @cookie[key]
  end

  def []=(key, val)
    @cookie[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    res.set_cookie(COOKIE_NAME, {
      value: JSON.generate(@cookie),
      path: '/'
    })
  end
end
