export const show = () => {
  let more = document.getElementById("more");
  let data = document.getElementById("data");
  let less = document.getElementById("less");
  if (more.style.display === "inline-block") {
    more.style.display = "none";
    less.style.display = "inline-block";
    data.style.display = "inline-block";
  } else {
    data.style.display = "none";
    more.style.display = "inline-block";
    less.style.display = "none";
  }
};
