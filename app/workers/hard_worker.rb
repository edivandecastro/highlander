require 'sidekiq-scheduler'

class HardWorker
  include Sidekiq::Worker

  def perform(scheduled_at)
    puts scheduled_at
  end
end
