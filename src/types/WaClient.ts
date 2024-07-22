import event from "../event";
import { SendAction, StartAction, StatusAction } from "./Actions";

export default interface WaClient {
  send: (params: SendAction) => WaClient;
  start: (params: StartAction) => WaClient;
  status: (params: StatusAction) => WaClient;
  on: typeof event.on;
}
