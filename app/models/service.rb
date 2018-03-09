class Service
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  embedded_in :chart
  embeds_one :schedule
  embeds_many :query_strings

  accepts_nested_attributes_for :query_strings
end
