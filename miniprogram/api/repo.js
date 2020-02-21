const request = require('../utils/request.js')

const getMyRepos = params => {
  return request({
    url: '/v5/user/repos',
    method: 'GET',
    data: params
  })
}

const getUserRepos = params => {
  return request({
    url: `/v5/users/${params.username}/repos`,
    method: 'GET',
    data: params
  })
}

const getUserStars = params => {
  return request({
    url: `/v5/users/${params.username}/starred`,
    method: 'GET',
    data: params
  })
}

const getRepoInfo = params => {
  return request({
    url: `/v5/repos/${params.owner}/${params.repo}`,
    method: 'GET',
    data: params
  })
}

const getRepoReadme = params => {
  return request({
    url: `/v5/repos/${params.owner}/${params.repo}/readme`,
    method: 'GET',
    data: params
  })
}

const getRepoTree = params => {
  return request({
    url: `/v5/repos/${params.owner}/${params.repo}/git/trees/${params.sha}`,
    method: 'GET',
    data: params
  })
}

const getRepoBlob = params => {
  return request({
    url: `/v5/repos/${params.owner}/${params.repo}/git/blobs/${params.sha}`,
    method: 'GET',
    data: params
  })
}

const getRepoIssues = params => {
  return request({
    url: `/v5/repos/${params.owner}/${params.repo}/issues`,
    method: 'GET',
    data: params
  })
}

const getIssue = params => {
  return request({
    url: `/v5/repos/${params.owner}/${params.repo}/issues/${params.number}`,
    method: 'GET',
    data: params
  })
}

const getIssueComments = params => {
  return request({
    url: `/v5/repos/${params.owner}/${params.repo}/issues/${params.number}/comments`,
    method: 'GET',
    data: params
  })
}

module.exports = {
  getMyRepos,
  getUserRepos,
  getUserStars,
  getRepoInfo,
  getRepoReadme,
  getRepoTree,
  getRepoBlob,
  getRepoIssues,
  getIssue,
  getIssueComments
}