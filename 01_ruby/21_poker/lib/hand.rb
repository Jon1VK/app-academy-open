require_relative "card"

class Hand
  RANKS = [
    :high_card,
    :one_pair,
    :two_pair,
    :three_of_a_kind,
    :straight,
    :flush,
    :full_house,
    :four_of_a_kind,
    :straight_flush,
  ]

  def initialize
    @cards = []
  end

  def [](pos)
    @cards[pos]
  end

  def <<(card)
    @cards << card
    nil
  end

  def []=(pos, card)
    @cards[pos] = card
  end

  def <=>(hand)
    return -1 if self < hand
    return 1 if self > hand
    self.compare_a_tie(hand)
  end

  def ==(hand)
    (self <=> hand) == 0
  end

  def rank
    return :straight_flush if straight? && flush?
    return :four_of_a_kind if n_of_a_kind?(4)
    return :full_house if full_house?
    return :flush if flush?
    return :straight if straight?
    return :three_of_a_kind if n_of_a_kind?(3)
    return :two_pair if two_pair?
    return :one_pair if n_of_a_kind?(2)
    return :high_card
  end

  def to_s
   rank.to_s.split('_').map(&:capitalize).join(' ') + "\n" +
    @cards.map(&:to_s)
      .map { |card_s| card_s.split("\n") }
      .transpose
      .map { |row| row.join(" ") }
      .join("\n") + "\n" +
    @cards.length.times.inject("") {|str, index| str + "Card #{index + 1} "}
  end

  protected

  def <(hand)
    RANKS.index(self.rank) < RANKS.index(hand.rank) 
  end

  def >(hand)
    RANKS.index(self.rank) > RANKS.index(hand.rank)
  end

  def compare_a_tie(object)
    self.rank_counts_sorted <=> object.rank_counts_sorted
  end

  def rank_counts_sorted
    rank_counts.sort_by { |rank, count| [count, rank] }.reverse
  end

  private

  def rank_counts
    counts = Hash.new(0)
    @cards.each { |card| counts[card.rank] += 1 }
    counts
  end

  def straight?
    baby_straight? || (
      rank_counts.length == 5 &&
      @cards.max.rank - @cards.min.rank == 4
    )
  end

  def baby_straight?
    @cards.sort.map(&:rank) == [2, 3, 4, 5, 14]
  end

  def flush?
    @cards.all? { |card| card.suit == @cards.first.suit }
  end

  def n_of_a_kind?(n)
    rank_counts.has_value?(n)
  end

  def full_house?
    n_of_a_kind?(3) && n_of_a_kind?(2)
  end

  def two_pair?
    rank_counts.values.count { |count| count == 2 } == 2
  end
end