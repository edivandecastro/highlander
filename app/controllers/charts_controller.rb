class ChartsController < ApplicationController

  def index
    # Opções:
    # 1 - Executar o serviço em:
    # 2 - Executar o serviço a cada;
    # 3 - Executar o serviço no/às
    # Executa o serviço apenas uma vez em 10 segundos
    # Sidekiq.set_schedule('hardworker', { in: ['10s'], class: 'HardWorker', args: ['legal'] })

    # Executa o serviço a cada 10 segundos
    # Sidekiq.set_schedule('hardworker', { every: ['10s'], class: 'HardWorker', args: ['a cada 10s'] })

    # Executa o serviço em determinado dia e horário ou serviçoomente em determinado horário
    # Sidekiq.set_schedule('hardworker', { at: ['2017/02/28 16:08:40 America/Sao_Paulo'], class: 'HardWorker', args: ['a cada 10s'] })
    # Sidekiq.set_schedule('hardworker1', { at: ['17:56:00'], class: 'HardWorker', args: ['a cada 10s'] })

    # Executa o serviço mensalmente
    # Sidekiq.set_schedule('hardworker1', { cron: ['59 23 L * * America/Sao_Paulo'], class: 'HardWorker', args: ['cron 10s'] })
  end

  def new
    @chart = Chart.new(title: nil, subtitle: nil, scale: nil, min_value: nil, http_method: nil, url: nil)
    @http_methods = OptionsSelect.find_by(name: "http_method").values
  end

  def create
    binding.pry
  end

  def add_params
    @id = Time.new.to_f.to_s.gsub(".", "")
    respond_to do |format|
      format.js
    end
  end
end
