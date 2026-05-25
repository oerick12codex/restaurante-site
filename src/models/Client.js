class Client {
  #id;
  #name;
  #email;
  #phone;

  constructor(id, name, email, phone) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#phone = phone;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get phone() {
    return this.#phone;
  }
}