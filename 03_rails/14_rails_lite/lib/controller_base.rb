require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require_relative './flash'

class ControllerBase
  @@protect_from_forgery = false

  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, params={})
    @req = req
    @res = res
    @params = req.params.merge(params)
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    raise 'Render or redirect was already called' if already_built_response?
    res.redirect(url)
    session.store_session(res)
    flash.store_flash(res)
    @already_built_response = true
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise 'Render or redirect was already called' if already_built_response?
    res.write(content)
    res.content_type = content_type
    session.store_session(res)
    flash.store_flash(res)
    @already_built_response = true
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    file_path = "views/#{self.class.name.underscore}/#{template_name}.html.erb"
    file_dir = File.dirname(file_path)
    file_name = File.basename(file_path)
    file_path = File.join(file_dir, file_name)
    template = File.read(file_path)
    content = ERB.new(template).result(binding)
    render_content(content, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(req)
  end

  def flash
    @flash ||= Flash.new(req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    if @@protect_from_forgery && !req.get?
      check_authenticity_token
    end

    self.send(name)
    render(name) unless already_built_response?
  end

  def form_authenticity_token
    @authenticity_token ||= SecureRandom.urlsafe_base64
    res.set_cookie('authenticity_token', {
      value: @authenticity_token,
      path: '/'
    })
    @authenticity_token
  end

  def check_authenticity_token
    auth_token = params['authenticity_token']
    
    if auth_token.nil? || auth_token != req.cookies['authenticity_token']
      raise 'Invalid authenticity token'
    end
  end

  def self.protect_from_forgery
    @@protect_from_forgery = true
  end
end

