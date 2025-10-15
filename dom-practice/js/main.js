const titleEl = document.getElementById("title");
titleEl.style.textAlign = "center";
//console.dir(titleEl);

const pEl = document.querySelector(".cool");
//console.log(pEl)
pEl.innerHTML = "comments for <strong> today </strong>";
pEl.style.color = "pink";

const linkEl = document.querySelector("a");
linkEl.setAttribute("href", "https://www.gogole.com");

const commentsEls = document.querySelectorAll("#comments > li");

for (let commentsEl of commentsEls) {
  //console.log(commentEl)
  commentsEl.styler.fontSize = "30px";
}
