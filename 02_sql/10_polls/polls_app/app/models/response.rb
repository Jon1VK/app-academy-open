# == Schema Information
#
# Table name: responses
#
#  id               :bigint           not null, primary key
#  user_id          :bigint           not null
#  answer_choice_id :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Response < ApplicationRecord
  validate :respondent_has_not_answered_yet

  belongs_to :respondent,
    class_name: 'User',
    foreign_key: :user_id

  belongs_to :answer_choice

  has_one :question,
    through: :answer_choice

  def sibling_responses
    self.question
      .responses
      .where.not(id: self.id)
  end

  def respondent_already_answered?
    self.sibling_responses.exists?(respondent: self.user_id)
  end

  def respondent_has_not_answered_yet
    if self.respondent_already_answered?
      errors.add(:base, 'User has alreaydy answered')
    end
  end
end
