import { Socket, createConnection } from "net";
import WaClient from "./types/WaClient";
import { SendAction, StartAction, StatusAction } from "./types/Actions";
import event from "./event";
import { ChatEvent } from "./types/Events";

const waClient = (host: string, port: number) => {
  let client: Socket | undefined;

  const reconnect = () => {
    return new Promise<void>((resolve) => {
      const id = setTimeout(async () => {
        await create()
          .then(() => {
            clearTimeout(id);
            resolve();
            return;
          })
          .catch(() => {});
      }, 10000);
    });
  };

  const create = () =>
    new Promise<WaClient>((resolve) => {
      const socket = createConnection(
        {
          host,
          port,
        },
        () => {
          client = socket;
          event.emit("connected");

          socket.on("data", (data) => {
            try {
              const raws = data.toString().split("\n");

              for (const raw of raws) {
                const newData = JSON.parse(raw);
                event.emit(newData.type, newData.payload);
              }
            } catch (e) {}
          });
        }
      );

      socket.on("close", async () => {
        client = undefined;
        await reconnect();
      });

      socket.on("error", async () => {
        socket.end();
      });

      resolve(apiClient);
    });

  const send = (params: SendAction): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!client) return reject(new Error("CLIEN NOT READY"));
      client.write(
        JSON.stringify({
          payload: params,
          type: "send",
        }) + "\n",
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  };

  const start = (params: StartAction): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!client) return reject(new Error("CLIEN NOT READY"));
      client.write(
        JSON.stringify({
          type: "start",
          payload: params,
        }) + "\n",
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  };

  const status = (params: StatusAction): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!client) return reject(new Error("CLIEN NOT READY"));
      client.write(
        JSON.stringify({
          type: "status",
          payload: params,
        }) + "\n",
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  };

  const fakeMessage = (data: ChatEvent) => {
    event.emit("chat", data);
  };

  const apiClient: WaClient = { send, start, status, on: event.on };

  return { create, fakeMessage };
};

export default waClient;
