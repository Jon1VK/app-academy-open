require 'mime/types'

class Static
  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    req = Rack::Request.new(env)

    if req.path.start_with?('/public/')
      res = Rack::Response.new

      file_dir = File.dirname(req.path[1..-1])
      file_name = File.basename(req.path)
      file_uri = File.join(file_dir, file_name)

      if File.file?(file_uri)
        file = File.read(file_uri)
        res.status = 200
        res.write(file)
        res.content_type = MIME::Types.type_for(file_uri).first.content_type
        res.finish
      else
        res.status = 404
        res.finish
      end
    else
      app.call(env)
    end
  end
end
