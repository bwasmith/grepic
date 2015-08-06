import axios from 'axios';

function getRepos(username){
	return axios.get(`https://api.github.com/users/${username}/repos`);
};

function getUserInfo(username) {
	return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
	getGithubInfo: function(username) {
		return axios.all([getRepos(username), getUserInfo(username)])
			//() => {} arrow functions retain 'this' context from original context
			.then((arr) => {
				return {
					repos: arr[0].data,
					bio: arr[1].data
				};
			});
	},

  getSpotifyUserInfo: function(accessToken) {
    return axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },

  getRefreshToken: function(refreshToken) {
    return axios.get('/refresh_token', {
      data: {
        'refresh_token': refreshToken
      }
    })
  },

  getProjectData: function(token) {
    return axios.get("https://www.pivotaltracker.com/services/v5/projects?fields=name", {
      headers: {
        'X-TrackerToken': token
      }
    })
  },

  getEpics: function(project, token) {
    return axios.get(`https://www.pivotaltracker.com/services/v5/projects/${project}/epics?fields=name`, {
      headers: {
        'X-TrackerToken': token
      }
    })
  },

  getContributors: function(project, epicName, token) {
    return axios.get(`https://www.pivotaltracker.com/services/v5/projects/${project}/stories?with_label=${epicName}&fields=owners,story_type,estimate,current_state`, {
      headers: {
        'X-TrackerToken': token
      }
    })
  }
};

export default helpers;