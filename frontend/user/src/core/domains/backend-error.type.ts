import { ErrorCodes } from "../enums/errors-codes.enum";

export type ErrorType =
  | ErrorCodes.INVALID_DATA
  | ErrorCodes.INVALID_DRIVER
  | ErrorCodes.NO_RIDES_FOUND
  | ErrorCodes.INVALID_DISTANCE
  | ErrorCodes.DRIVER_NOT_FOUND;

export interface BackendErrorProps {
  error_code: ErrorType;
  error_description: string;
}

export class BackendError {
  message: string;
  constructor({ error_code }: BackendErrorProps) {
    this.message = error_code;
  }
}
