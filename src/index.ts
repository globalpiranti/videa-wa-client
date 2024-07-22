import { Socket, createConnection } from "net";
import WaClient from "./types/WaClient";
import { SendAction, StartAction, StatusAction } from "./types/Actions";
import event from "./event";
import { ChatEvent } from "./types/Events";

const waClient = (host: string, port: number) => {
  let client: Socket;

  const create = () =>
    new Promise<WaClient>((resolve) => {
      const socket = createConnection(
        {
          host,
          port,
        },
        () => {
          socket.on("data", (data) => {
            const newData = JSON.parse(data.toString());
            event.emit(newData.type, newData.payload);
          });
          client = socket;

          resolve(apiClient);
        }
      );
    });

  const send = (params: SendAction): WaClient => {
    client.write(
      JSON.stringify({
        payload: params,
        type: "send",
      })
    );

    return apiClient;
  };

  const start = (params: StartAction): WaClient => {
    client.write(
      JSON.stringify({
        type: "start",
        payload: params,
      })
    );

    return apiClient;
  };

  const status = (params: StatusAction): WaClient => {
    client.write(
      JSON.stringify({
        type: "status",
        payload: params,
      })
    );

    return apiClient;
  };

  const fakeMessage = (data: ChatEvent) => {
    event.emit("chat", data);
  };

  const apiClient: WaClient = { send, start, status, on: event.on };

  return { create, fakeMessage };
};

export default waClient;
