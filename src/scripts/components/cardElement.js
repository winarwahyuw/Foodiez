class CardElement extends HTMLElement{
    connectedCallback(){
        this.id = this.getAttribute("id")
        this.image = this.getAttribute("image")
        this.name = this.getAttribute("name")
        this.description = this.getAttribute("description")
        this.city = this.getAttribute("city")
        this.rating = this.getAttribute("rating")
        this.render()
    }


    render(){
        this.innerHTML=`
        <div class="card">
            <img class="card-img" src="${this.image}" alt="Gambar Restoran">
            <div class="card-body">
                <p class="title">${this.name}</p>
                <p>${this.city}</p>
            </div>
            <div class="card-footer">
                <p><i class="fa fa-star icon-secondary"></i> ${this.rating}</p>
            </div>
        </div>
        `
    }
}

customElements.define("card-element", CardElement)
