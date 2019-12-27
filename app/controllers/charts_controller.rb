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
    # @chart = Chart.new(chart_params)
    # @chart.save

    respond_to do |format|
      format.json { render json: { id: "@chart.id.to_s", message: "Sucesso!" } }
    end
  end

  def update_search_service
    http_method = params[:service][:http_method] if params.key? :service
    parameters = []
    if params.key?(:service) && params[:service].key?(:params)
      params[:service][:params].values.each { |param| parameters.push({ param["key"] => param["value"] }) }
    end
    service_hash = { http_method: http_method, url: params[:service][:url] }
    service_hash.store(:params, parameters) if parameters.any?
    service = Service.new(service_hash)
    Chart.where(id: params[:id]).last.update(service: service) if http_method && params[:service][:url]
  end

  def update_schedule_service
    type_run_service = params[:service][:type_run_service] if params.key? :service
    if type_run_service
      case type_run_service
      when "in"
        hash_service = Chart.find(params[:id]).service.to_hash
        hash_service.store("type_run_service", params[:service][:type_run_service])
        hash_service.store("date", params[:service][:date])
        Chart.where(id: params[:id]).update(service: hash_service)
      end
    end
  end

  def inputs_type_run_service
    if params["type"] == "at"
      render partial: "charts/partials/inputs_at"
    else
      render partial: "charts/partials/inputs_in_every"
    end
  end

  private

  def chart_params
    params.require(:chart).permit(
      :title,
      :subtitle,
      :scale,
      :min_value,
      service: [
        :http_method,
        :url
      ]
    ).tap do |whitelisted|
      whitelisted[:service][:query_strings_attributes] = params[:chart][:service][:query_strings_attributes].permit!
      whitelisted[:service][:schedule] = params[:chart][:service][:schedule].permit!
    end
  end
end
