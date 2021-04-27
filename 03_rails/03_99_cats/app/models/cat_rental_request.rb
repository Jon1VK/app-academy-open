# == Schema Information
#
# Table name: cat_rental_requests
#
#  id         :bigint           not null, primary key
#  cat_id     :bigint           not null
#  start_date :date             not null
#  end_date   :date             not null
#  status     :string           default("PENDING"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CatRentalRequest < ApplicationRecord
  STATUSES = %w(PENDING APPROVED DENIED)

  validates :start_date, :end_date,
    presence: true

  validates :status,
    inclusion: { in: CatRentalRequest::STATUSES }

  validate :end_date_is_not_before_start_date
  
  validate :does_not_overlap_approved_request

  belongs_to :cat

  def approve!
    self.transaction do
      overlapping_pending_requests.each(&:deny!)
      update!(status: 'APPROVED')
    end
  end

  def deny!
    update!(status: 'DENIED')
  end

  def pending?
    status == "PENDING"
  end

  private
  def end_date_is_not_before_start_date
    if self.end_date < self.start_date
      self.errors.add(:base, "End date can't be before start date")
    end
  end

  def overlapping_requests
    CatRentalRequest
      .where.not(id: self.id)
      .where(
        cat_id: self.cat_id,
        start_date: [self.start_date..self.end_date],
        end_date: [self.start_date..self.end_date])
  end

  def overlapping_pending_requests
    overlapping_requests.where(status: "PENDING")
  end

  def overlapping_approved_requests
    overlapping_requests.where(status: "APPROVED")
  end

  def does_not_overlap_approved_request
    if overlapping_approved_requests.exists?
      self.errors.add(:base, "Request overlaps with an approved request")
    end
  end
end
