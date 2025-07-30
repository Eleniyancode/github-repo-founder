import * as model from './model.js';
import reposView from './Views/reposView.js';
import paginationView from './Views/paginationView.js';
import searchView from './Views/searchView.js';
import quickSearchView from './Views/quickSearchView.js';
import repoInfoView from './Views/repoInfoView.js';


const controlRepositories = async function() {
    try {
        const query = searchView.getQuery();
        if (!query) return

        //rendering spinner
        reposView.renderSpinner()

        //rendering quick search repo field
        reposView.renderSearch();

        //loding repositories
        await model.getRepo(query);

        //rendering the repo list
        reposView.render(model.getReposPage(1))

        //redering initial pagination
        paginationView.render(model.state.search)
    }catch(err) {
        // console.log(err);
        reposView.renderError("Problem fecthing data, please check the username you entered or your internet connection and try again!")
    }
}

// controling the pagination function logic
const controlPagination = function (gotoPage) {
  //Rendering NEW search result
  reposView.render(model.getReposPage(gotoPage));

  //redering initial pagination
  paginationView.render(model.state.search)
};

//controlling the search function logic
const controlSearching = function () {
 reposView.render(model.searchByKeyword())   
}

const controlSearchingBlur = function() {
    reposView.render(model.getReposPage(1))
}

// controlling the get more infon on repo function logic
const controlMoreInfo = function(repoName) {
    const repo = model.state.search.results.find(r => r.name === repoName);
    if (!repo) return;
    console.log(repo);
    reposView.clear()
    paginationView.clear();
    repoInfoView.render(repo)
    repoInfoView.show();
}

// controlling the delete function logic
const controlDeletingRepo = function(repoName, gotoPage) {
    // filtering out the repo that is clicked to be deleted
    model.state.search.results = model.state.search.results.filter((repo) => {
        return repo.name !== repoName})

    // re-rendering the filtered repo list
    reposView.render(model.getReposPage(gotoPage))

}

// controlling the back to home function logic
const controlBackToList = function() {
    repoInfoView.hide()
    reposView.show();
    paginationView.show();
}

// initialization
const init = function() {
    controlRepositories();
    paginationView.addHandlerClick(controlPagination);
    searchView.addHandlerSearch(controlRepositories);
    quickSearchView.addHandlerSearch(controlSearching);
    quickSearchView.addHandlerSearchBlur(controlSearchingBlur)
    repoInfoView.addHandlerBack(controlBackToList);
    reposView.addHandlerMoreInfo(controlMoreInfo);
    reposView.addHandlerDelete(controlDeletingRepo);
}

init();