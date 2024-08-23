import waClient from "../src/index";

(async () => {
  const client = await waClient("localhost", 5000).create();

  client.on("connected", () => {
    client.start({ id: "videa-blast" });
  });
})();
