class Employee
  def initialize(name, title, salary, boss)
    @name = name
    @title = title
    @salary = salary
    @boss = boss
    @boss.employees << self if boss
  end

  def bonus(multiplier)
    salary * multiplier
  end

  attr_reader :name, :title, :salary, :boss
end