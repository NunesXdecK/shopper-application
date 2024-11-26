import { LocalStorageService } from "../../core/domains/local-storage-service";

export const localStorageService = <T = unknown>(
  key: string
): LocalStorageService<T> => {
  const handleError = (error: Error) => {
    console.error(`[Error][LocalStorageService][${key}]`, error.message);
  };
  return {
    key,
    set: (value: T): void => {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        handleError(error as unknown as Error);
      }
    },

    get: async (): Promise<T> => {
      try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? (JSON.parse(serializedValue) as T) : ({} as T);
      } catch (error) {
        handleError(error as unknown as Error);
      }
      return {} as T;
    },

    remove: (): void => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        handleError(error as unknown as Error);
      }
    },
  };
};
