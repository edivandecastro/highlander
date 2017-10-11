$( document ).ready(function() {
  $('#btn-add-params').click(function() {
    var count= $("div[identify='row-param']").length + 1
    $.ajax({ url: 'add_params' });
  });

  $('#btn-remove-params').click(function() {
    var row = $(this).attr('row');
    $('#row-param-'+row).remove();
  });

  $('#button-save-chart').click( function(e) {
    $.post({
      url: $('#create').val(),
      data: $('#new_chart').serialize(),
      success: function(data, textStatus, jqXHR) {
        $('#id').val(data.id);
        $('#button-update-search-service').hide();
      },
      typeData: 'json'
    });

    e.preventDefault();
  });

  $('#button-update-search-service').on('click', function(e) {
    $.post({
      url: $('#route_update_search_service').val(),
      data: $('#update_search_service').serialize(),
      success: function(data, textStatus, jqXHR) {
        console.log(data);
      },
      typeData: 'json'
    });

    e.preventDefault();
  });

  $('#options_select_type_run_service').on('change', function(e) {
    $.get({
      url: $('#route_inputs_type_run_service').val(),
      data: { type: $(this).val() },
      success: function(data, textStatus, jqXHR) {
        console.log(data);
      }
    });
  });

  $('.selectpicker').selectpicker({
    width: 250
  });
});
