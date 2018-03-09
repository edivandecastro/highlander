require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Highlander
  class Application < Rails::Application
    config.time_zone = "America/Fortaleza"
    config.i18n.default_locale = :"pt-BR"
    config.generators do |g|
      g.orm :mongoid
    end
  end
end
