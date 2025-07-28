import View from "./view.js";

class ReposView extends View {
  _parentElement = document.querySelector(".repos");
  _searchInputDiv = document.querySelector('.search-div')
  _errorMessage = "No repository found or repository list is empty";
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateListMarkup).join(''); 
  }

   renderSearch() {
    this._searchInputDiv.style.opacity = '1';
  //   const markup = `
  //       <div class="search-div">
  //           <input type="text" class="search" placeholder="search for a repo...">
  //           <img class="search-icon" src="./src/img/icons8-search-30.png" alt="icon-logo">
  //       </div>
  //   `
  //   this._mainElement.insertAdjacentHTML('afterbegin', markup);
   }

  _generateListMarkup(repo) {
    return `
            <div class="repo">
            <div class="repo-details">
                <a href="#" class="repo-name">${repo.name}</a>
                <p class="repo-description">${(repo.description
                    ? repo.description
                  : "No description for this repo, click on more info button to view more information about the repository"
                )}</p>
            </div>

            <div class="repo-buttons">
                <button>More Info</button>
                <button>Delete</button>
            </div>
          </div>
        `
  }
}


export default new ReposView();