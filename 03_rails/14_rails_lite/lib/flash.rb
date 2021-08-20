require 'json'

class Flash
  COOKIE_NAME = '_rails_lite_app_flash'

  attr_reader :now
  
  def initialize(req)
    @now = req.cookies[COOKIE_NAME] ? 
      JSON.parse(req.cookies[COOKIE_NAME]) : {}
    @cookie = {}
  end

  def [](key)
    @now[key.to_s] || @now[key.to_sym]
  end

  def []=(key, val)
    @now[key] = val
    @cookie[key] = val
  end

  def store_flash(res)
    res.set_cookie(COOKIE_NAME, {
      value: JSON.generate(@cookie),
      path: '/'
    })
  end
end
