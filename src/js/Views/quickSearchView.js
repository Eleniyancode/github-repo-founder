class QuickSearchView {
  _parentElement = document.querySelector(".main");
  element = document.querySelector(".search");

  addHandlerSearch(handler) {
    console.log(this.element);
    this.element.addEventListener("input", function () {
      handler(this.element);
    });
  }

  addHandlerSearchBlur(handler) {
    this.element.addEventListener("blur", function () {
      handler(this.element);
    });
  }
}

export default new QuickSearchView();
