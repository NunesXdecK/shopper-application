export interface AuthService<I = unknown, O = unknown> {
  logout: () => void;
  login: (input: I) => Promise<O>;
}
