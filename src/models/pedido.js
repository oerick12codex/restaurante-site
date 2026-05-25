class pedido {
    #id;
    #cliente;
    #itens;
    #valor;
    #status;

    constructor(id, cliente, itens, valor, status) {
        this.#id = id;
        this.#cliente = cliente;
        this.#itens = itens;
        this.#valor = valor;
        this.#status = status;
    }

    get id() {
        return this.#id;
    }

    get cliente() {
        return this.#cliente;
    }

    get itens() {
        return this.#itens;
    }

    get valor() {
        return this.#valor;
    }

    get status() {
        return this.#status;
    }
}