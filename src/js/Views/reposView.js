import View from "./view.js";

class ReposView extends View {
  _parentElement = document.querySelector(".repos");
  _searchInputDiv = document.querySelector('.search-div');
  _errorMessage = "No repository found or repository list is empty";
  _message = '';

  addHandlerMoreInfo(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.more-info-btn');
      if (!btn) return
      const repoName = btn.dataset.repo;
      console.log(repoName);
      handler(repoName)

    })
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btnDelete = e.target.closest('.btn-delete');
      if (!btnDelete) return
      const repoName = btnDelete.dataset.repo
      console.log(repoName);
      handler(repoName)
    })
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateListMarkup).join(''); 
  }

   renderSearch() {
    this._searchInputDiv.style.opacity = '1';
   }

  _generateListMarkup(repo) {
    return `
            <div class="repo">
            <div class="repo-details">
                <a href="#" class="repo-name">${repo.name}</a>
                <p class="repo-description">${(repo.description
                    ? repo.description
                  : "No description for this repository"
                )}</p>
            </div>

            <div class="repo-buttons">
                <button data-repo="${repo.name}" class="more-info-btn">More Info</button>
                <button data-repo="${repo.name}" class="btn-delete">Delete</button>
            </div>
          </div>
        `
  }
}


export default new ReposView();