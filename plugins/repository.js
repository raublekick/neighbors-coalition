import resourcesApi from "@/api/resources.js";
import eventsApi from "@/api/events.js";

export default (ctx, inject) => {
  const resourcesRepository = resourcesApi(ctx.$axios);
  const eventsRepository = eventsApi(ctx.$axios);
  
  const repositories = {
    resources: resourcesRepository,
    events: eventsRepository
  };
  inject("repositories", repositories);
};
