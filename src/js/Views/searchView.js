import View from "./view";

class SearchView extends View {
  _parentElement = document.querySelector("header");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInputField();
    return query;
  }

  _clearInputField() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
