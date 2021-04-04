class Card
  attr_reader :face_value, :face_up

  def initialize(face_value)
    @face_value = face_value
    @face_up = false
  end

  def to_s
    @face_up ? @face_value : " "
  end

  def flip
    @face_up = !@face_up
  end

  def ==(card)
    @face_value == card.face_value
  end
end