require_relative "deck"
require_relative "hand"
require_relative "display"

class Round
  attr_reader :players, :big_blind, :bets, :hands, :checks

  def initialize(players, big_blind)
    @players = players
    @big_blind = big_blind
    @bets = initialize_bets
    @hands = initialize_hands
    @checks = initialize_checks
    @deck = Deck.shuffled_deck
    @display = Display.new(self)
  end

  def play
    deal_cards
    place_blinds
    play_betting_round
    play_swapping_round
    play_betting_round
    distribute_pot
  end

  def share(player)
    (share_percent(player) * pot).round
  end

  private

  def current_player
    @players.first
  end

  def change_turn
    @players.rotate!
  end

  def round_over?
    @players.length <= 1
  end

  def betting_round_over?
    @checks.values.all?(true) || (
      @players.one?(&:has_money?) &&
      @players.select(&:has_money?).all? { |player| @bets[player] == highest_bet }
    )
  end

  def pot
    @bets.values.sum
  end

  def highest_bet
    @bets.values.max
  end

  def highest_bet_of_winners
    bets_of_winners.values.max
  end

  def check_bet(player)
   highest_bet - @bets[player]
  end

  def share_percent(player)
    return 0 unless winners.include?(player)
    1.0 * bets[player] / bets_of_winners.values.sum
  end

  def winners
    @players.select { |player| @hands[player] == winning_hand }
  end

  def winning_hand
    @hands.values.max
  end

  def bets_of_winners
    @bets.select { |player, bet| winners.include?(player) }
  end

  def initialize_bets
    @players.map { |player| [player, 0] }.to_h
  end

  def initialize_hands
    @players.map { |player| [player, Hand.new] }.to_h
  end

  def initialize_checks
    @players.map { |player| [player, false] }.to_h
  end

  def display_turn_info
    @display.clear
    @display.print_bets
    @display.print_turn(current_player)
    @display.pause

    @display.clear
    @display.print_bets
    @display.print_hand(current_player)
  end

  def deal_cards
    5.times { @players.each { |player| @hands[player] << @deck.draw_card } }
  end

  def place_blinds
    small_blind_player = current_player
    change_turn

    big_blind_player = current_player
    change_turn

    @display.clear
    @display.print_bets
    @display.print_blinds(small_blind_player, big_blind_player)
    @display.pause

    @bets[small_blind_player] = small_blind_player.bet(@big_blind / 2)
    @bets[big_blind_player] = big_blind_player.bet(@big_blind)
  end

  def play_betting_round
    @checks = initialize_checks

    until betting_round_over? || round_over?
      if current_player.has_money?
        display_turn_info
        play_betting_turn
      else
        @checks[current_player] = true
        change_turn
      end
    end
  end

  def play_betting_turn
    case current_player.get_command
    when :check
      @bets[current_player] += current_player.bet(check_bet(current_player))
      @checks[current_player] = true
      change_turn
    when :fold
      @checks.delete(current_player)
      @players.delete(current_player)
    when :raise
      bet = check_bet(current_player) + current_player.get_raise
      @bets[current_player] += current_player.bet(bet)
      @checks = initialize_checks
      @checks[current_player] = true
      change_turn
    when :all_in
      @bets[current_player] += current_player.bet_all
      @checks = initialize_checks
      checks[current_player] = true
      change_turn
    end
  rescue RuntimeError => error
    puts "\n" + error.message
    retry
  end

  def play_swapping_round
    return if round_over?
    @players.length.times do
      display_turn_info
      play_swapping_turn
      change_turn
    end
  end

  def play_swapping_turn
    current_player.get_swap_positions.each do |pos|
      @hands[current_player][pos] = @deck.draw_card
    end
  rescue RuntimeError => error
    puts "\n" + error.message
    retry
  end

  def distribute_pot
    pay_back_excessive_bets

    @display.clear
    @display.print_hands
    @display.pause

    @display.clear
    @display.print_shares
    @display.pause

    winners.each { |player| player.pay(share(player)) }
  end

  def pay_back_excessive_bets
    @players.each do |player|
      excessive_bet = @bets[player] - highest_bet_of_winners
      if excessive_bet > 0
        player.pay(excessive_bet) 
        @bets[player] -= excessive_bet
      end
    end
  end
end