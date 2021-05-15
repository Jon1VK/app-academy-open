module ApplicationHelper
  def error(column)
    column = column.to_s
    if flash[:errors] && flash[:errors][column]
      "<div class=\"error\">#{flash[:errors][column]}</div>".html_safe
    end
  end
end
