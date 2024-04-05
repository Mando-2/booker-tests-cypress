import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://booker-site:3001",
    // baseUrl: "http://localhost:3001",
  },
});
