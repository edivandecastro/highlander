$( document ).ready(function() {

  var applySelectpicker = function () {
    $('.selectpicker').selectpicker({
      width: 250
    });
  }

  $('#btn-add-params').click(function() {
    var source = $("#fields-params").html();
    var template = Handlebars.compile(source);
    var date = new Date();
    var context = { id: date.getTime() };
    var html = template(context);
    $("#fields_params_url").append(html);

    $("button[name='remove-params']").click(function () {
      var row = $(this).attr("row");
      $("#" + row).remove();
    });
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
        $('.chart_id').val(data.id);
        $('#button-save-params').show();
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

  $('#button-update-schedule-service').on('click', function (e) {
    $.post({
      url: $('#route_update_schedule_service').val(),
      data: $('#update_schedule_service').serialize(),
      success: function (data, textStatus, jqXHR) {
        console.log(data);
      },
      typeData: 'json'
    });

    e.preventDefault();
  });

  $('#chart_service_schedule_type_run_service').on('change', function(e) {
    if ($(this).val() == "in") {
      var value = "00/00/0000";
      var ex = "Ex.: 06/08/2018"

      var source = $("#in-template").html();
      var template = Handlebars.compile(source);
      var html = template({ value: value, example: ex });
      $("#place-value-schedule").html(html);
    } else {
      if ($(this).val() == "every") {
        var source = $("#every-template").html();
        var template = Handlebars.compile(source);
        var html = template({ value: value, example: ex });
        $("#place-value-schedule").html(html);
        applySelectpicker();
      } else {
        if ($(this).val() == "at") {
          var value_time = "00:00:00";
          var example_time = "Ex.: 14:30:00"
          var value_date = "00/00/0000";
          var example_date = "Ex.: 06/08/2018"

          var source = $("#at-template").html();
          var template = Handlebars.compile(source);
          var html = template({
            value_time: value_time,
            example_time: example_time,
            value_date: value_date,
            example_date: example_date
          });
          $("#place-value-schedule").html(html);
        }
      }
    }

    $('.input-mask').each(function (index) {
      $(this).mask($(this).attr("data-mask"));
    });
  });

  applySelectpicker();
});
