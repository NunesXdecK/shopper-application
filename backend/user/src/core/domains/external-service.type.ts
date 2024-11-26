export interface ExternalService {
  name: string;
  init: () => Promise<boolean>;
}
