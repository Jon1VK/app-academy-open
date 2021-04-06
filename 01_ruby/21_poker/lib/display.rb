require_relative "round"

class Display
  def initialize(round)
    @round = round
  end

  def clear
    system("clear")
  end

  def pause
    puts "\nPress ENTER to continue"
    STDIN.gets
  end

  def print_turn(player)
    puts "\n#{player.name}'s turn."
  end

  def print_hand(player)
    puts "\n#{player.name}'s hand"
    puts "\n#{@round.hands[player]}"
  end

  def print_blinds(small_blind_player, big_blind_player)
    puts "\nBlinds"
    puts "#{small_blind_player.name} places small blind of #{@round.big_blind / 2}"
    puts "#{big_blind_player.name} places big blind of #{@round.big_blind}"
  end

  def print_bets
    puts "\nBets:"
    puts (
      "Player".ljust(longest_name_str) + " | " +
      "Money".ljust(longest_money_str) + " | " +
      "Bet".ljust(longest_bet_str)
    )

    @round.bets.each do |player, bet|
      puts (
        player.name.to_s.ljust(longest_name_str) + " | " +
        player.money.to_s.ljust(longest_money_str) + " | " +
        bet.to_s.ljust(longest_bet_str)
      )
    end
  end

  def print_hands
    puts "\nHands:"
    @round.players.each { |player| print_hand(player) }
  end

  def print_shares
    puts "\nShares:"
    puts (
      "Player".ljust(longest_name_str) + " | " +
      "Share".ljust(longest_share_str)
    )
    @round.players.each do |player|
      puts (
        player.name.to_s.ljust(longest_name_str) + " | " +
        @round.share(player).to_s.ljust(longest_share_str)
      )
    end
  end

  private

  def longest_name_str
    ["player".length, *@round.players.map(&:name).map(&:length)].max
  end

  def longest_money_str
    ["money".length, *@round.players.map(&:money).map(&:to_s).map(&:length)].max
  end

  def longest_bet_str
    ["money".length, *@round.bets.values.map(&:to_s).map(&:length)].max
  end

  def longest_share_str
    ["share".length, *@round.players.map { |player| @round.share(player) }.map(&:to_s).map(&:length)].max
  end
end