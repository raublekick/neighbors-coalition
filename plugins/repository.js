import resourcesApi from "@/api/resources.js";

export default (ctx, inject) => {
  const resourcesRepository = resourcesApi(ctx.$axios);
  
  const repositories = {
    resources: resourcesRepository
  };
  inject("repositories", repositories);
};
