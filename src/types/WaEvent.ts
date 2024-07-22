import { ChatEvent, StatusEvent } from "./Events";

export default interface WaEvent {
  status: (data: StatusEvent) => Promise<void> | void;
  chat: (data: ChatEvent) => Promise<void> | void;
}
