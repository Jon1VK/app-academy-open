module TracksHelper
  def ugly_lyrics(lyrics)
    lyrics
      .split("\n")
      .map { |row| "&#9835; #{h(row)}" }
      .join("\n")
      .html_safe
  end
end
