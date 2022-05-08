import * as _ from "lodash";

export const state = () => ({
  resources: [],
  events: [],
  totalFeeds: 1,
});


// https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  else {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") { dist = dist * 1.609344 }
    if (unit === "N") { dist = dist * 0.8684 }
    return dist;
  }
}
export const mutations = {
  SET_RESOURCES(state, resources) {
    _.forEach(resources, item => {
      item.distance = -1;
    });
    state.resources = resources;
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  ADD_RESOURCE(state, resource) {
    state.resources.push(resource);
  },
  UPDATE_DISTANCES(state, payload) {
    const updatedItems = [];
    _.forEach(payload.resources, item => {
      if (item.lat && item.lng) {
        item.distance = distance(item.lat, item.lng, payload.center[0], payload.center[1], "M").toFixed(2);
      }
      updatedItems.push(item);
    });
    state.resources = updatedItems;
  }
}

export const actions = {
  async loadData({ commit }) {
    const data = await this.$repositories.resources.get();

    commit("SET_RESOURCES", data);
  },
  async loadEvents({ commit }) {
    const data = await this.$repositories.events.get();
    commit("SET_EVENTS", data);
  },
  async addLocationResource({ commit }, payload) {
    await commit("ADD_RESOURCE", payload);
  },
  async updateDistances({ commit }, payload) {
    await commit("UPDATE_DISTANCES", payload);
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch("loadData");
    await dispatch("loadEvents");
  }
}
