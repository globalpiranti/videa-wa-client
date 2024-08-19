export interface StatusEvent {
  id: string;
  status: "UP" | "DOWN";
  qr: string | null;
}

export interface ChatEvent {
  id: string;
  chat: any;
}

export interface MessageEvent<T = any> {
  id: string;
  to: string;
  content: any;
  extraParams?: Record<string, T>;
}
