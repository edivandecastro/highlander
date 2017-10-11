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

    # Executa o serviço em determinado dia e horário ou serviçomente em determinado horário
    # Sidekiq.set_schedule('hardworker', { at: ['2017/02/28 16:08:40 America/Sao_Paulo'], class: 'HardWorker', args: ['a cada 10s'] })
    # Sidekiq.set_schedule('hardworker1', { at: ['17:56:00'], class: 'HardWorker', args: ['a cada 10s'] })

    # Executa o serviço mensalmente
    # Sidekiq.set_schedule('hardworker1', { cron: ['59 23 L * * America/Sao_Paulo'], class: 'HardWorker', args: ['cron 10s'] })
  end

  def new
    @chart = Chart.new(title: nil, subtitle: nil, scale: nil, min_value: nil, http_method: nil, url: nil)
    @http_methods = OptionsSelect.find_by(name: "http_method").values
    @type_run_services = OptionsSelect.find_by(name: "type_run_service").values
  end

  def create
    @chart = Chart.new(chart_params)
    @chart.save

    respond_to do |format|
      format.json { render json: { id: @chart.id.to_s, message: "Sucesso!" } }
    end
  end

  def update_search_service
    http_method = params[:service][:http_method] if params.key? :service
    parameters = []
    if params[:service].has_key? :params
      params[:service][:params].values.each { |param| parameters.push({ param["key"] => param["value"] }) }
    end
    service_hash = { http_method: http_method, url: params[:service][:url] }
    service_hash.store(:params, parameters) if parameters.any?
    Chart.where(id: params[:id]).update(service: service_hash) if http_method && params[:service][:url]
  end

  def update_schedule_service
  end

  def inputs_type_run_service
    if params["type"] == "at"
      render partial: "charts/partials/inputs_at"
    else
      render partial: "charts/partials/inputs_in_every"
    end
  end

  def add_params
    @id = Time.new.to_f.to_s.gsub(".", "")
    respond_to do |format|
      format.js
    end
  end

  def chart_params
    params.require(:chart).permit(
      :title,
      :subtitle,
      :subtitulo,
      :scale,
      :titulo,
      :min_value
    )
  end
end
