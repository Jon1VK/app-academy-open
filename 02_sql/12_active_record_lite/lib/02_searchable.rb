require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    where_statement = params.keys.map do |key|
      "#{key} = ?"
    end.join(' AND ')

    results = DBConnection.execute(<<-SQL, *params.values)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
      WHERE
        #{where_statement}
    SQL

    parse_all(results)
  end
end

class SQLObject
  extend Searchable
end
