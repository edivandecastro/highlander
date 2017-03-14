$( document ).ready(function() {
  $("button[name='remove-params']").click(function() {
    var row = $(this).attr("row");
    $("#"+row).remove();
    console.debug();
  });
});
