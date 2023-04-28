import communication from "./communication";
import dashboard from "./dashboard";
import financial from "./financial";
import genealogy from "./genealogy";
import members from "./members";
import reports from "./reports";
import settings from "./settings";
import statistics from "./statistics";
import store from "./store";
import subAdmin from "./subAdmin";
import subscriptions from "./subscriptions";
import tools from "./tools";
import user from "./user";

const routes = [
  ...communication,
  ...dashboard,
  ...financial,
  ...genealogy,
  ...members,
  ...reports,
  ...settings,
  ...statistics,
  ...store,
  ...subAdmin,
  ...subscriptions,
  ...tools,
  ...user,
];

export default routes;
