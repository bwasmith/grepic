import axios from 'axios';
import interpolatingPolynomial from 'interpolating-polynomial';

//hue values for each 'level', see http://hslpicker.com/
// var WANDERING = 120,
//     COMFY = 70,
//     SOLOREADY = 57,
//     ARCHITECT = 31,
//     ANCHOR = 18;

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

  getContributors: function(project, token) {
    return axios.get(`https://www.pivotaltracker.com/services/v5/projects/${project}/memberships?fields=person`, {
      headers: {
        'X-TrackerToken': token
      }
    })
  },

  getEpicStories: function(project, epicName, token) {
    return axios.get(`https://www.pivotaltracker.com/services/v5/projects/${project}/stories?with_label=${epicName}&fields=owners,story_type,estimate,current_state`, {
      headers: {
        'X-TrackerToken': token
      }
    })
  },

  generateColorFn: function(dict) {
    var f = interpolatingPolynomial([[dict.wandering, WANDERING],
                                     [dict.comfy, COMFY],
                                     [dict.soloReady, SOLOREADY],
                                     [dict.architect, ARCHITECT],
                                     [dict.anchor, ANCHOR]]);
    return f;
  },

  setColor: function(colorFn, points, colorKey) {
    if(points > colorKey.anchor){
      points = colorKey.anchor;
    }
    else if(points < colorKey.wandering){
      points = colorKey.wandering;
    }
    var hue = colorFn(points);
    if(hue < ANCHOR || hue > WANDERING){
      console.log(`The color function mapped your ${points} points to a hue
        lower than the anchor color or higher than the wandering color. Your
        hue was ${hue} so we automatically set it to ${ANCHOR}.`);
      hue = ANCHOR;
    };
    return "hsl(" + hue + ",100%,50%)";
  }
};

export default helpers;
