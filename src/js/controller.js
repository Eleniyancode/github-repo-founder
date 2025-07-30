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
        console.log(err);
        reposView.renderError("Problem fecthing data, please check the username you entered or your internet connection and try again!")
    }
}

const controlPagination = function (gotoPage) {
  //Rendering NEW search result
  reposView.render(model.getReposPage(gotoPage));

  //redering initial pagination
  paginationView.render(model.state.search)
};

const controlSearching = function () {
 reposView.render(model.searchByKeyword())   
}

const controlSearchingBlur = function() {
    reposView.render(model.getReposPage(1))
}

const controlMoreInfo = function(repoName) {
    const repo = model.state.search.results.find(r => r.name === repoName);
    if (!repo) return;
    console.log(repo);
    reposView.clear()
    paginationView.clear();
    repoInfoView.render(repo)
    repoInfoView.show();
}

const controlDeletingRepo = function(repoName, gotoPage) {
    model.state.search.results = model.state.search.results.filter((repo) => {
        return repo.name !== repoName})
    

    console.log(model.state.search.results);
    reposView.render(model.getReposPage(gotoPage))

}

const controlBackToList = function() {
    repoInfoView.hide()
    reposView.show();
    paginationView.show();
}

controlRepositories();
paginationView.addHandlerClick(controlPagination);
searchView.addHandlerSearch(controlRepositories);
quickSearchView.addHandlerSearch(controlSearching);
quickSearchView.addHandlerSearchBlur(controlSearchingBlur)
repoInfoView.addHandlerBack(controlBackToList);
reposView.addHandlerMoreInfo(controlMoreInfo);
reposView.addHandlerDelete(controlDeletingRepo);