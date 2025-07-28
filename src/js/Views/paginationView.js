import View from "./view";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _errorMessage = "No repository found or repository list is empty";
  _message = "";

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
        const btn = e.target.closest('button')
        if (!btn) return;

        const gotoPage = +btn.dataset.goto;
        handler(gotoPage)
    })
  }

  _generateMarkup() {
    const currPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        console.log(numPages);
        let html;
        for (let i =1; i <= numPages; i++) {
            html += `<button data-goto="${i}" class="button">Page ${i}</button>`
        }
        return html
    }
}


export default new PaginationView();