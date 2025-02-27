class MainSearch extends SearchForm {
  constructor() {
    super();
    this.allSearchInputs = document.querySelectorAll('input[type="search"]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    let allSearchForms = [];
    this.allSearchInputs.forEach((input) => allSearchForms.push(input.form));
    this.input.addEventListener("focus", this.onInputFocus.bind(this));
    if (allSearchForms.length < 2) return;
    allSearchForms.forEach((form) =>
      form.addEventListener("reset", this.onFormReset.bind(this))
    );
    this.allSearchInputs.forEach((input) =>
      input.addEventListener("input", this.onInput.bind(this))
    );
  }

  onFormReset(event) {
    super.onFormReset(event);
    if (super.shouldResetForm()) {
      this.keepInSync("", this.input);
    }
  }

  onInput(event) {
    const target = event.target;
    this.keepInSync(target.value, target);
  }

  onInputFocus() {
    const isSmallScreen = window.innerWidth < 750;
    if (isSmallScreen) {
      this.scrollIntoView({ behavior: "smooth" });
    }
  }

  keepInSync(value, target) {
    this.allSearchInputs.forEach((input) => {
      if (input !== target) {
        input.value = value;
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const searchTerm = "{{ search.terms }}".toLowerCase();
  const productList = document.querySelectorAll(".product-item"); // Modify this selector based on your product list structure

  productList.forEach((product) => {
    const productDescription = product
      .querySelector(".product-description")
      .textContent.toLowerCase();

    if (productDescription.includes(searchTerm)) {
      product.style.display = "none"; // Hide the product if description matches the search term
    }
  });
});

customElements.define("main-search", MainSearch);
