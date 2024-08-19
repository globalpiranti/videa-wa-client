import waClient from "../src/index";
import { StatusEvent } from "../src/types/Events";

(async () => {
  const client = await waClient("localhost", 3500).create();

  client.start({ id: "default" });

  client.on("status", (e: StatusEvent) => console.log(e));
  client.on("message.sent", (e: MessageEvent) => console.log(e));
  client.on("message.fail", (e: MessageEvent) => console.log(e));

  setTimeout(() => {
    (async () => {
      for (let index = 0; index < 25; index++) {
        await client.send({
          id: "default",
          to: "6283836319218",
          content: {
            text: "Hello",
          },
          extraParams: {
            key: index,
          },
        });
      }
    })();
  }, 5000);
})();
