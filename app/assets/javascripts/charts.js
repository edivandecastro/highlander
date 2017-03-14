$( document ).ready(function() {
  $("#btn-add-params").click(function() {
    var count= $("div[identify='row-param']").length + 1
    $.ajax({ url: "add_params" });
  });

  $("#btn-remove-params").click(function() {
    var row = $(this).attr("row");
    $("#row-param-"+row).remove();
  });
});
