import { unsplashAccessKey, getApi } from "./api.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const imgResult = document.querySelector(".grid-gallery");
const errorMessage = document.getElementById("error-message");
const loadMoreBtn = document.getElementById("load-more-btn");

let numberOfDisplayedImg = 18;
let totalPageOfResult = 1;
let page = 1;
let prevSearchKeyword = "";

function addImgs(imgs) {
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
async function getFoundImgsByKeyword() {
  try {
    const searchKeyword = searchInput.value;
    //console.log(searchKeyword);

    if (searchKeyword != "") {
      if (searchKeyword !== prevSearchKeyword) {
        page = 1;
        imgResult.innerHTML = ""; //clear the previous imgs so that new img set can replace
      }

      const apiUrlbyKeyword = `https://api.unsplash.com/search/photos?query=${searchKeyword}&per_page=${numberOfDisplayedImg}&client_id=${unsplashAccessKey}&page=${page}`;

      const foundImgs = await getApi(apiUrlbyKeyword);
      console.log(foundImgs);
      addImgs(foundImgs.results);
      totalPageOfResult = foundImgs.total_pages;
      prevSearchKeyword = searchKeyword;
    } else {
      getRandomImgs();
    }

    errorMessage.textContent = ""; //clear previous error message
  } catch (error) {
    errorMessage.textContent =
      "Sorry, there was an error. Unable to fetch data.";
    console.log("Unable to fetch data", error);
  } finally {
    if (page === totalPageOfResult || totalPageOfResult === 1) {
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.disabled = false;
    }
  }
}

searchBtn.addEventListener("click", getFoundImgsByKeyword);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (searchInput.value !== "" && searchInput.value === prevSearchKeyword) {
      page++;
    }
    getFoundImgsByKeyword();
  }
});

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

//load more images
loadMoreBtn.addEventListener("click", () => {
  page++;
  getFoundImgsByKeyword();
});

//initial load
window.addEventListener("load", getRandomImgs);
