export const state = () => ({
  resources: [],
  events: [],
  totalFeeds: 1,
});

export const mutations = {
  SET_RESOURCES(state, resources) {
    state.resources = resources;
  },
  SET_EVENTS(state, events) {
    state.events = events;
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
  async nuxtServerInit({ dispatch }) {
    await dispatch("loadData");
    await dispatch("loadEvents");
  }
}
