import { Octokit } from "@octokit/core";
import { RES_PER_PAGE, TIMEOUT_SEC } from "./config";
import { timeout } from "./helpers";

// defining the state variable
export const state = {
  repos: {},
  search: {
    username: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
const searchEl = document.querySelector('.search')

// function logic to fetch repo using octokit
export const getRepo = async function (username) {
  try {
    state.search.username = username;
    // making the API call
    const octokit = new Octokit();
    const res = await Promise.race([octokit.request(`GET /users/${username}/repos`, {
      username: `${username}`,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }), timeout(TIMEOUT_SEC)]);

    // checking the status of the API call and handling the error
    if (res.status !== 200) {
        throw new Error('Problem fetching data, please try again!');
    }

    // consuming the promise return from the API call
    const { data } = res;
    // console.log( res, data);
    state.search.results = data.map((repo) => {
      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        fullName: repo.full_name,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        issues: repo.open_issues,
        watchers: repo.watchers,
        forks: repo.forks,
        visibility: repo.visibility,
        language: repo.language,
        stars: repo.stargazers_count,
        userType: repo.owner.user_view_type
      };
    });
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//Pagination logic
export const getReposPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
} 

//Search input logic
export const searchByKeyword = function(element = searchEl) {
  element = searchEl
  const keyword = element.value.toLowerCase();
  // console.log(state.search.results);
  // console.log(keyword);
    const filtered = state.search.results.filter(repo => {  
      return repo.name.toLowerCase().includes(keyword);
    })
    // console.log(filtered);
      return filtered;
}