import { ChatEvent, StatusEvent } from "./Events";

export default interface WaEvent {
  status: (data: StatusEvent) => Promise<void> | void;
  chat: (data: ChatEvent) => Promise<void> | void;
  "message.sent": (data: MessageEvent) => Promise<void> | void;
  "message.fail": (data: MessageEvent) => Promise<void> | void;
  connected: () => Promise<void> | void;
}
