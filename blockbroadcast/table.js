$(document).ready(function(){
   $("#transData").children("tr").children("td").click(function(){
      $(this.parentNode).toggleClass("active");
    });
});