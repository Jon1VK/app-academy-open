module Api::ApiHelper
  def full_error_messages(errors)
    messages = Hash.new { |h, k| h[k] = [] };
    errors.each do |error|
      messages[error.attribute] << error.full_message
    end
    messages
  end
end