import * as model from './model.js';
import reposView from './Views/reposView.js';
import paginationView from './Views/paginationView.js';
import searchView from './Views/searchView.js';
import quickSearchView from './Views/quickSearchView.js';


const controlRepositories = async function() {
    try {

        const query = searchView.getQuery();
        if (!query) return

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

controlRepositories();
paginationView.addHandlerClick(controlPagination);
searchView.addHandlerSearch(controlRepositories)
quickSearchView.addHandlerSearch(controlSearching)