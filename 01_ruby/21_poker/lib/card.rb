require "colorize"

SUIT_COLORS = {
  hearts: :red,
  diamonds: :red,
  clubs: :black,
  spades: :black
}

SUIT_SYMBOLS = {
  hearts: "\u2665",
  diamonds: "\u2666",
  clubs: "\u2663",
  spades: "\u2660"
}

RANK_SYMBOLS = {
  2 => "2",
  3 => "3",
  4 => "4",
  5 => "5",
  6 => "6",
  7 => "7",
  8 => "8",
  9 => "9",
  10 => "10",
  11 => "J",
  12 => "Q",
  13 => "K",
  14 => "A"
}

class Card
  SUITS = [:hearts, :diamonds, :clubs, :spades]

  attr_reader :rank, :suit
  
  def initialize(suit, rank)
    @suit = suit
    @rank = rank
  end

  def <=>(card)
    self.rank <=> card.rank
  end

  def to_s
    " #{RANK_SYMBOLS[@rank].ljust(2)} #{SUIT_SYMBOLS[@suit]} "
      .colorize(color: SUIT_COLORS[@suit], background: :white) + "\n" +
    "".ljust(6).on_white + "\n" +
    "".ljust(6).on_white + "\n" +
    " #{SUIT_SYMBOLS[@suit]} #{RANK_SYMBOLS[@rank].rjust(2)} "
      .colorize(color: SUIT_COLORS[@suit], background: :white)
  end
end