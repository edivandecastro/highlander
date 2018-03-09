module ChartsHelper
  def options_type_run_service(type_run_services)
    type_run_services.map do |v|
      type = t("options_select.type_run_service.#{v}")
      [t("options_select.type_run_service.label", t: type).mb_chars.upcase.wrapped_string, v]
    end
  end
end
