# == Schema Information
#
# Table name: courses
#
#  id            :bigint           not null, primary key
#  name          :string
#  prereq_id     :integer
#  instructor_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Course < ApplicationRecord
    has_many :enrollments
    has_many :enrolled_students, through: :enrollments, source: :student
    belongs_to :prerequisite,
        class_name: 'Course',
        foreign_key: :prereq_id,
        optional: true

    belongs_to :instructor, class_name: 'User'
end
