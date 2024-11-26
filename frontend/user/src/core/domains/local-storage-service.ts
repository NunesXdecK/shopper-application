export interface LocalStorageService<I = unknown, O = unknown> {
  key: string;
  remove: () => void;
  get: () => Promise<O>;
  set: (input: I) => void;
}
