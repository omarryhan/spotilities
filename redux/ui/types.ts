export interface SnackbarState {
  isOpen: boolean;
  text: string;
  type: 'neutral' | 'error' | 'warning' | 'information' | 'success';
  action?: () => Promise<void> | void;
  actionText: string;
  time: number;
}

export interface InitialStateInterface {
  snackbar: SnackbarState;
}
