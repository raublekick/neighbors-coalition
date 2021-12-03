export const state = () => ({
  resources: [],
  totalFeeds: 1,
});

export const mutations = {
  SET_RESOURCES(state, resources) {
    state.resources = resources;
    console.log(state.resources);
  }
}

export const actions = {
  async loadData({ commit }) {
    const data = await this.$repositories.resources.get();
    commit("SET_RESOURCES", data);
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch("loadData");
  }
}
