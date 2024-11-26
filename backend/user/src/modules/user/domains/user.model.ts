export type UserInput = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  id;
  name;
  email;
  password;
  createdAt;
  updatedAt;
  #error: string = "";

  constructor({ id, name, email, password }: Partial<UserInput>) {
    this.#error = "";

    if (!name || name?.length === 0) this.#error = "Name not informed.";

    const isInvalid = this.#error.length > 0;
    if (isInvalid) throw new Error(this.#error);

    if (!id) {
      this.id = Math.random().toString().replaceAll(".", "");
      this.password = Math.random().toString().replaceAll(".", "");
      this.createdAt = new Date();
    } else {
      this.id = id;
      this.password = password;
      this.updatedAt = new Date();
    }

    this.name = name;
    this.email = email;
  }
}
