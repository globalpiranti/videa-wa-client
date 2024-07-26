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
  type: string;
  to: string;
  text?: string;
  extraParams?: Record<string, T>;
}
