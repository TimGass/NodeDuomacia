import $ from "jquery";
if($("form.search button").css("font-size") === "18px"){
  $("form.search input").on("focus", () => {
    $("footer").css("position", "relative");
    $("footer").css("margin-top", "37px");
  });

  $("form.search input").on("blur", () => {
    $("footer").css("position", "fixed");
    $("footer").css("margin-top", "0px");
  });
}
