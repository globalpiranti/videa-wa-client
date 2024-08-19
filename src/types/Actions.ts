export interface SendAction<T = any> {
  id: string;
  to: string;
  content: any;
  extraParams?: Record<string, T>;
}

export interface StartAction {
  id: string;
}

export interface StatusAction {
  id: string;
}
