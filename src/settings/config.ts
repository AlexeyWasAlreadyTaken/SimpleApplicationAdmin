// config.ts
const Config = {
  API_BASE_URL : "http://localhost:5067/api/",
} as const;

console.log("⚙️ Loaded config with URL:", Config.API_BASE_URL);

export default Config;