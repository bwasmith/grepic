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
};

export default helpers;
