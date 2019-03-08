export enum CloseReason {
    SUCCESS,
    CANCEL
  }

export enum KEY_CODE {
    ESC = 27
}
export class DialogResult<T> {
    reason: CloseReason;
    data: T;
    constructor(reason: CloseReason = CloseReason.SUCCESS, data: T = null) {
      this.reason = reason;
      this.data = data;
    }
}
