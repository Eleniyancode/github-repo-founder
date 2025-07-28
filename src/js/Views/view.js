export default class View {
  _data;

  render(data) {
    //Guard clause if there is no data found or empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    console.log(this._data);
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  
    renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="#icon-loader"></use>
          </svg>
        </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
                    <div>
                      <svg>
                        <use href="#icon-alert-triangle"></use>
                      </svg>
                    </div>
                    <p>${message}</p>
                  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
