type Params<I> = Partial<{ where: Partial<I> }>;

export interface ORMRepository<I> {
  create: (params: Partial<I>) => I;
  find: (params?: Params<I>) => Promise<I[]>;
  findOne: (params: Params<I>) => Promise<I>;
  save: (params: Partial<I>) => Promise<void>;
}
