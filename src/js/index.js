import { unsplashAccessKey, getApi } from "./api.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const imgResult = document.querySelector(".grid-gallery");
const errorMessage = document.getElementById("error-message");

let numberOfDisplayedImg = 18;

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

function getRandomPageNumber() {
  return Math.floor(Math.random() * 10) + 1; //random number from 0 to 10
}

//GET IMAGES BY SEARCH KEYWORD:
async function getFoundImgsByKeyword() {
  try {
    const searchKeyword = searchInput.value;
    //console.log(searchKeyword);

    if (searchKeyword != "") {
      const page = getRandomPageNumber();

      const apiUrlbyKeyword = `https://api.unsplash.com/search/photos?query=${searchKeyword}&per_page=${numberOfDisplayedImg}&client_id=${unsplashAccessKey}&page=${page}`;

      const foundImgs = await getApi(apiUrlbyKeyword);
      //console.log(foundImgs);
      addImgs(foundImgs.results);
    } else {
      getRandomImgs();
    }
    //clear previous error message
    errorMessage.textContent = "";
  } catch (error) {
    errorMessage.textContent =
      "Sorry, there was an error. Unable to fetch data.";
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
