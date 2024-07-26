export interface StatusEvent {
  id: string;
  status: "UP" | "DOWN";
  qr: string | null;
}

export interface ChatEvent {
  id: string;
  chat: any;
}

export interface MessageEvent {
  id: string;
  payload: {
    type: string;
    to: string;
    text?: string;
  };
}
