class AttrAccessorObject
  def self.my_attr_accessor(*names)
    names.each do |name|
      # Getter method
      define_method(name) do
        instance_variable_get("@#{name}")
      end

      # Setter method
      define_method("#{name}=") do |value|
        instance_variable_set("@#{name}", value)
      end
    end
  end
end
