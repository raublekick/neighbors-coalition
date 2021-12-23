export default ($axios) => ({
  async get() {
    const response = await $axios.get("/api/calendar");
    return response.data;
  },
});
