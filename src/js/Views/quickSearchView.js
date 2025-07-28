class QuickSearchView {
  _parentElement = document.querySelector(".main");
  // _searchInputEl = document.querySelector('.search')
  element = document.querySelector('.search');
  // renderSearch() {
  //   const markup = this._generateMarkup();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  addHandlerSearch(handler) {
    console.log(this.element);
    // handler(this._searchInputEl)
    this.element.addEventListener('input', function(){
      handler(this.element)
    //     handler(this.searchInputEl)
     })
  }
}


export default new QuickSearchView();
