class OptionsSelect
  include Mongoid::Document

  field :name, type: String
  field :values, type: Array
end
