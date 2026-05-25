class reservation {
    #id;
    #client;
    #date;
    #timestamp;
    #qtdPessoas;

    constructor(id, client, date, timestamp, qtdPessoas) {
        this.#id = id;
        this.#client = client;
        this.#date = date;
        this.#timestamp = timestamp;
        this.#qtdPessoas = qtdPessoas;
    }
  get id() {
    return this.#id;
  }

  get client() {
    return this.#client;
  }

  get date() {
    return this.#date;
  }

  get timestamp() {
    return this.#timestamp;
  }

  get qtdPessoas() {
    return this.#qtdPessoas;
  }
}