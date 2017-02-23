class ChartsController < ApplicationController

  def index
    binding.pry
    Sidekiq.set_schedule('hardworker', { every: ['10s'], class: 'HardWorker', args: ['legal'] })
    # Sidekiq.set_schedule('hardworker2', { 'every' => ['2m'], 'class' => 'HardWorker' })
    # HardWorker.perform_async("bob", 5)
    # HardWorker.perform_in(2.minutes, "jack", 2)
    # HardWorker.perform_at(1.minutes, "jack", 1)
  end
end
