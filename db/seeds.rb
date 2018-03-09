OptionsSelect.where(name: "http_method", values: ["GET", "POST"]).first_or_create
OptionsSelect.where(name: "type_run_service", values: ["in", "every", "at"]).first_or_create
