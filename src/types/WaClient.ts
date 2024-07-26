import event from "../event";
import { SendAction, StartAction, StatusAction } from "./Actions";

export default interface WaClient {
  send: (params: SendAction) => Promise<void>;
  start: (params: StartAction) => Promise<void>;
  status: (params: StatusAction) => Promise<void>;
  on: typeof event.on;
}
