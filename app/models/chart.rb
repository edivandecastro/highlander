class Chart
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  embeds_one :service
end
