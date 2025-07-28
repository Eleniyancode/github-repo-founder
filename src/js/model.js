import { Octokit } from "@octokit/core";
import { RES_PER_PAGE } from "./config";

// // Octokit.js
// // https://github.com/octokit/core.js#readme

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
export const getRepo = async function (username) {
  try {
    state.search.username = username;
    const octokit = new Octokit();
    const res = await octokit.request(`GET /users/${username}/repos`, {
      username: `${username}`,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const { data } = res;

    state.search.results = data.map((repo) => {
      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
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
  console.log(state.search.results);
  console.log(keyword);
    const filtered = state.search.results.filter(repo => {  
      return repo.name.toLowerCase().includes(keyword);
    })
    console.log(filtered);
      return filtered;
}