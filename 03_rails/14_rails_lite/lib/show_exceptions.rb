require 'erb'
include ERB::Util

class ShowExceptions
  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    begin
      app.call(env)
    rescue => exception
      file_path = "views/500.html.erb"
      file_dir = File.dirname(file_path)
      file_name = File.basename(file_path)
      file_path = File.join(file_dir, file_name)
      template = File.read(file_path)
      content = ERB.new(template).result(binding)

      res = Rack::Response.new
      res.status = '500'
      res.write(content)
      res.content_type = 'text/html'
      res.finish
    end
  end

  private

  def render_exception(e)
  end

end
