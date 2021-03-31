class Code
  POSSIBLE_PEGS = {
    "R" => :red,
    "G" => :green,
    "B" => :blue,
    "Y" => :yellow
  }

  def self.valid_pegs?(pegs)
    pegs.all? { |peg| POSSIBLE_PEGS.has_key?(peg.upcase) }
  end

  def self.random(n)
    pegs = []
    n.times { pegs << POSSIBLE_PEGS.keys.sample }
    Code.new(pegs)
  end

  def self.from_string(string)
    Code.new(string.chars)
  end

  attr_reader :pegs

  def initialize(pegs)
    raise 'invalid pegs' if !Code.valid_pegs?(pegs)

    @pegs = pegs.map(&:upcase)
  end

  def [](i)
    @pegs[i]
  end

  def length
    @pegs.length
  end

  def num_exact_matches(code)
    (0...code.length).count { |i| self[i] == code[i] }
  end

  def num_near_matches(code)
    code.pegs.count { |peg| self.pegs.include?(peg) } - self.num_exact_matches(code)
  end

  def ==(code)
    code.pegs == self.pegs
  end
end
