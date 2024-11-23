export interface ORMRepository<I> {
  find: () => Promise<I[]>;
  create: (params: Partial<I>) => I;
  save: (params: Partial<I>) => Promise<void>;
  findOne: (params: { where: Partial<I> }) => Promise<I>;
}
