import { BackendError } from "../domains/backend-error.type";
import { ErrorService } from "../domains/error-service.type";

export const errorHandlerService = (): ErrorService => ({
  handler: (error: unknown) => {
    if (error instanceof BackendError) {
      throw new Error(error.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(`Unknown error: ${error}`);
  },
});
