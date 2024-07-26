export interface SendAction<T = any> {
  id: string;
  type: string;
  to: string;
  text?: string;
  extraParams?: Record<string, T>;
}

export interface StartAction {
  id: string;
}

export interface StatusAction {
  id: string;
}
