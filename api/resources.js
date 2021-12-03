export default ($axios) => ({
  async get() {
    const response = await $axios.get("/api/resources");
    return response.data;
  },
});
