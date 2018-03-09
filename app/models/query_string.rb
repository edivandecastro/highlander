class QueryString
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  embedded_in :service
end
