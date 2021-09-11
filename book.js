const searchResult = document.getElementById("search-result");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");
const counter = document.getElementById("counter-details");
const show = document.getElementById("show-details");

const searchBook = () => {
  //taking input from search box
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear data
  searchField.value = "";
  if (searchText === "") {
    errorDiv.innerText = "Search field cannot be empty.";
    return;
  }
  searchResult.innerHTML = "";
  // load data
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  spinner.classList.remove("d-none");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        spinner.classList.add("d-none");
        displaySearchResult(data);
      }, 1000);
    })
    .finally(() => {
      searchText === "";
    });

  //load result
  const displaySearchResult = (data) => {
    // Error Handing
    if (data.numFound === 0) {
      errorDiv.innerText = "NO Result Found";
    } else {
      errorDiv.innerText = "";
    }
    //counter
    if (data.numFound !== 0) {
      const count = document.createElement("div");
      count.innerHTML = `<h2 class="p-3 text-center">Total Result for ${searchText} is: ${data.numFound} & Showing 15 Result</h2> `;
      counter.appendChild(count);
    }

    //image check function
    const imageCheck = (data) => {
      //let check;
      if (data.hasOwnProperty("cover_i")) {
        return `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`;
      } else {
        return `/images/monk3.jpg`;
      }
    };

    const info = data.docs;
    const value = info.slice(0, 15);
    searchResult.textContent = "";

    value.forEach((doc) => {
      console.log(doc);

      const div = document.createElement("div");

      div.classList.add("col");

      div.innerHTML = `
        
        <div class="card h-100 text-center">
        <img src="${imageCheck(
          doc
        )}" class="card-img-top w-100 h-auto text-center rounded p-5 img-size" alt="">
            <div class="card-body">
                <h5 class="card-title">Title: ${doc.title}</h5>
                <p class="card-text">Author: ${doc.author_name}</p>
                <p class="card-text">Publisher: ${doc.publisher}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">First Publish: ${
                  doc.first_publish_year
                }</small>
            </div>
        </div>
        `;

      searchResult.appendChild(div);
    });
  };
  counter.textContent = "";
};
