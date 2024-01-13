module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: "https://frontend-test-api.aircall.dev/",
    ENABLE_REDUX_DEV_TOOLS: "true",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: true,
      },
    ];
  },
};
