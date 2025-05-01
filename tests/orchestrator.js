import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const res = await fetch("http://localhost:3000/api/v1/status");
      if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
    }
  }
}

export default {
  waitForAllServices,
};
