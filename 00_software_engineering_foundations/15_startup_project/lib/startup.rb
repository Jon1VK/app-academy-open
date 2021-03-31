require "employee"

class Startup
    attr_reader :name, :funding, :salaries, :employees

    def initialize(name, funding, salaries)
        @name = name
        @funding = funding
        @salaries = salaries
        @employees = []
    end

    def valid_title?(title)
        @salaries.has_key?(title)
    end

    def >(startup)
        self.funding > startup.funding
    end

    def hire(employee_name, title)
        raise 'invalid title' if !valid_title?(title)

        @employees << Employee.new(employee_name, title)
    end

    def size
        @employees.length
    end

    def pay_employee(employee)
        salary = @salaries[employee.title]

        raise 'not enough funding' if @funding < salary
            
        employee.pay(salary)
        @funding -= salary
    end

    def payday
        @employees.each { |employee| pay_employee(employee) }
    end

    def average_salary
        @employees.map { |employee| @salaries[employee.title] }.sum / @employees.length 
    end

    def close
        @employees = []
        @funding = 0
    end

    def acquire(startup)
        @funding += startup.funding
        @salaries = startup.salaries.merge(@salaries)
        @employees += startup.employees
        startup.close
    end
end
