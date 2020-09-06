window.addEventListener("DOMContentLoaded", () => {
  let inputRange = document.querySelector("#volume");

  inputRange.addEventListener("input", () => {
    var { value } = inputRange;
    inputRange.style.background = `linear-gradient(to right, #969696 0%, #969696 ${value}%, #cfcfcf ${value}%)`;
  });
});
