export interface StatusEvent {
  id: string;
  status: "UP" | "DOWN";
  qr: string | null;
}

export interface ChatEvent {
  id: string;
  chat: any;
}
