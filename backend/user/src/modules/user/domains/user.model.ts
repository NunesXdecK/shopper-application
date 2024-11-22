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

  constructor({ id, name, email, password }: Partial<UserInput>) {
    let error = "";

    if (!name || name?.length === 0) error = "Name not informed.";
    if (!email || email?.length === 0) error = `${error}Email not informed.`;

    const isInvalid = error.length > 0;
    if (isInvalid) throw new Error(error);

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
