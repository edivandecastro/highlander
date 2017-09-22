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
      },
      typeData: 'json'
    });

    e.preventDefault();
  });

  $('#button-update-search-service').click( function(e) {
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
});
