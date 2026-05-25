class menuItem {
    #id
    #title
    #description
    #price
    #category
    #image
    
    constructor(id, title, description, price, category, image) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#price = price;
        this.#category = category;
        this.#image = image;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get price() {
        return this.#price;
    }

    get category() {
        return this.#category;
    }

    get image() {
        return this.#image;
    }
}