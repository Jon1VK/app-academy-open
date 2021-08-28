@tweets.each do |tweet|
  json.set! tweet.id do
    json.(tweet, :content, :user_id)
    json.username tweet.user.username
    json.mentions tweet.mentioned_users, :username
  end
end
