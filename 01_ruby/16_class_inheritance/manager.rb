require_relative "employee"

class Manager < Employee
  def initialize(name, title, salary, boss = nil)
    super
    @employees = []
  end

  def bonus(multiplier)
    multiplier * sub_employee_salaries_sum
  end

  def sub_employee_salaries_sum
    @employees.sum do |employee|
      if employee.is_a?(self.class)
        employee.salary + employee.sub_employee_salaries_sum
      else
        employee.salary
      end
    end
  end

  attr_reader :employees
end