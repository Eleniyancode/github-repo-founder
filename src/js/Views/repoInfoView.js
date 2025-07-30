import View from "./view";

class RepoInfoView extends View {
  _parentElement = document.querySelector(".repo-more-info");

  render(repo) {
    this._parentElement.innerHTML = `
        <table>
            <thead>
              <tr>
                <th colspan="2">${repo.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FullName:</td>
                <td>${repo.fullName}</td>
              </tr>

              <tr>
                <td>Languages:</td>
                <td>${repo.language}</td>
              </tr>

              <tr>
                <td>Type:</td>
                <td>${repo.userType}</td>
              </tr>

              <tr>
                <td>Forks:</td>
                <td>${repo.forks}</td>
              </tr>

              <tr>
                <td>Open Issues:</td>
                <td>${repo.issues}</td>
              </tr>

              <tr>
                <td>Created At:</td>
                <td>${repo.createdAt}</td>
              </tr>

              <tr>
                <td>Last update:</td>
                <td>${repo.updatedAt}</td>
              </tr>

              <tr>
                <td>Stars:</td>
                <td>${repo.stars}</td>
              </tr>

              <tr>
                <td>Watchers:</td>
                <td>${repo.watchers}</td>
              </tr>
            </tbody>
          </table>
          <div class="back-btn-div" >
            <button class="back-btn">Home <img src="" alt=""></button>
          </div>
    `;
  }

  addHandlerBack(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("back-btn")) handler();
    });
  }

  show() {
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
}

export default new RepoInfoView();
