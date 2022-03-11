import Component from "../core/Component.js";

export default class ProductDetailPage extends Component {
  setup() {
    this.$state = {
      selected: [],
      totalPrice: 0,
    };
  }
  template() {
    const { item } = this.$props;
    this.$state.price = item.price;
    console.log(this.$state);
    return `
    <h1>${item.name} 상품 정보</h1>
    <div class="ProductDetail">
      <img src="${item.imageUrl}">
      <div class="ProductDetail__info">
        <h2>${item.name}</h2>
        <div class="ProductDetail__price">${item.price}</div>
        <select class="option">
          <option>선택하세요.</option>
          ${item.productOptions
            .map((option) => {
              return `<option ${option.stock === 0 ? `disabled` : ""} data-id=${
                option.id
              } data-name=${option.name} data-price=${
                option.price
              } data-stock=${option.stock} >${
                option.stock === 0 ? `(품절)` : ""
              }${option.name} ${
                option.price === 0 ? `` : `(+ ${option.price}원)`
              }</option>`;
            })
            .join("")}
        </select>
        <div class="ProductDetail__selectedOptions">
          <h3>선택된 상품</h3>
          <ul>
          ${this.$state.selected
            .map((item) => {
              return ` 
            <li>
            ${item.name} ${item.price
                .toString()
                .replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ","
                )}원 <div><input class="selectNumber" type="number" value="1" data-id=${
                item.id
              }>개</div>
            </li>
            `;
            })
            .join("")}
          </ul>
          <div class="ProductDetail__totalPrice">${this.$state.totalPrice
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
          <button class="OrderButton">주문하기</button>
        </div>
      </div>
    </div>
  </div>
    `;
  }
  // 이벤트 등록
  setEvent() {
    const { toCart, item } = this.$props;
    this.$target.addEventListener("click", ({ target }) => {
      if (target.classList.contains("OrderButton")) {
        toCart();
      }
    });
    this.$target.addEventListener("change", ({ target }) => {
      if (target.classList.contains("option")) {
        const op =
          document.getElementsByTagName("option")[target.selectedIndex];
        const selected = {
          id: op.dataset.id,
          name: op.dataset.name,
          price: parseInt(op.dataset.price) + parseInt(this.$state.price),
          stock: 1,
        };

        for (let i = 0; i < this.$state.selected.length; i++) {
          if (selected.name === this.$state.selected[i].name) {
            return;
          }
        }
        this.$state.selected.push(selected);
        const storage = {
          name: item.name + " " + selected.name,
          price: selected.price,
          image: item.imageUrl,
          stock: selected.stock,
        };
        localStorage.setItem(op.dataset.id, JSON.stringify(storage));

        this.$state.totalPrice +=
          parseInt(op.dataset.price) + parseInt(this.$state.price);
        this.render();
      }
      if (target.classList.contains("selectNumber")) {
        console.log("인풋밸류", target.value, "아이디", target.dataset.id);
        const prev = {
          ...JSON.parse(localStorage.getItem(target.dataset.id)),
          stock: target.value,
        };
        localStorage.setItem(target.dataset.id, JSON.stringify(prev));
      }
    });
  }
}
