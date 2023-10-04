import { unsplashAccessKey, getApi } from "./api.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const imgResult = document.querySelector(".grid-gallery");

let numberOfDisplayedImg = 18;

//Function to create images(and its container) inside section gallery
function addImgs(imgs) {
  imgResult.innerHTML = ""; //clear the previous imgs so that new img set can replace

  imgs.forEach((img) => {
    const imageContainer = document.createElement("div");
    const imageLink = document.createElement("a");
    const image = document.createElement("img");

    imageContainer.classList.add("grid-item");

    imageLink.href = img.urls.full;
    imageLink.target = "_blank";
    imageLink.title = `Description: ${img.alt_description}\nBy: ${img.user.last_name}`;
    image.src = img.urls.regular;
    image.alt = img.alt_description;

    imageLink.append(image);
    imageContainer.append(imageLink);
    imgResult.append(imageContainer);
  });
}

//GET IMAGES BY SEARCH KEYWORD:
//Function loads imgs from api call based on searched keyword that user typed (when user doesn't type anything then display random imgs). This function is called when search button is clicked or user hit Enter.
function getRandomPageNumber() {
  return Math.floor(Math.random() * 100) + 1; //random number from 0 to 100
}

async function getFoundImgsByKeyword() {
  try {
    const searchKeyword = searchInput.value;

    if (searchKeyword != "") {
      const page = getRandomPageNumber();
      //console.log(searchKeyword);
      const apiUrlbyKeyword = `https://api.unsplash.com/search/photos?query=${searchKeyword}&per_page=${numberOfDisplayedImg}&client_id=${unsplashAccessKey}&page=${page}`;

      const foundImgs = await getApi(apiUrlbyKeyword);
      //console.log(foundImgs);
      addImgs(foundImgs.results);
    } else {
      getRandomImgs();
    }
  } catch (error) {
    console.log("Unable to fetch data", error);
  }
}
searchBtn.addEventListener("click", getFoundImgsByKeyword);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getFoundImgsByKeyword();
  }
});

//RANDOM IMG GALLERY BY PAGE LOAD:
//When page loaded, random images appears by getting data from api call and call function addImgs
async function getRandomImgs() {
  try {
    const apiUrlRandomImg = `https://api.unsplash.com/photos/random?count=${numberOfDisplayedImg}&client_id=${unsplashAccessKey}`;
    const randomImgs = await getApi(apiUrlRandomImg);
    //console.log(randomImgs);

    addImgs(randomImgs);
  } catch (error) {
    console.log("Unable to fetch data", error);
  }
}
window.addEventListener("load", getRandomImgs);

//api link get imgs by keyword: https://api.unsplash.com/search/photos?query=${searchKeyword}&client_id=${unsplashAccessKey}

/* //HOVER FOR BUTTON:
//Add hover effect for button by adding class from fontawesome
function btnHoverAnimation(event) {
  if (event.type === "mouseenter") {
    //searchBtn.classList.add("fa-bounce");
  } else if (event.type === "mouseleave") {
    //searchBtn.classList.remove("fa-bounce");
  }
}
searchBtn.addEventListener("mouseenter", btnHoverAnimation);
searchBtn.addEventListener("mouseleave", btnHoverAnimation); */
