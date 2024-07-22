export interface SendAction {
  id: string;
  type: string;
  to: string;
  text?: string;
}

export interface StartAction {
  id: string;
}

export interface StatusAction {
  id: string;
}
