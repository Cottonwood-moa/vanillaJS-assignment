import Component from "../core/Component.js";

export default class CartPage extends Component {
  setup() {
    this.$state = {
      totalPrice: 0,
      list: [],
    };
    for (let x in localStorage) {
      const item = JSON.parse(localStorage.getItem(x));
      if (item) {
        this.$state.list.push(item);
        this.$state.totalPrice +=
          parseInt(item.price) + parseInt(this.$state.totalPrice);
      }
    }
    console.log(this.$state);
  }
  // DOM
  template() {
    return `
    <h1>장바구니</h1>
        <div class="Cart">
          <ul>
          ${this.$state.list
            .map((item) => {
              return `
            <li class="Cart__item">
            <img src="${item.image}">
            <div class="Cart__itemDesription">
              <div>${item.name} ${item.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원 ${
                item.stock
              }개</div>
              <div>${item.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
            </div>
          </li>
          `;
            })
            .join("")}
          </ul>
          <div class="Cart__totalPrice">
            총 상품가격 ${this.$state.totalPrice
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
          </div>
          <button class="OrderButton">주문하기</button>
        </div>
    `;
  }
  // 이벤트 등록
  setEvent() {
    const { toHome } = this.$props;
    this.$target.addEventListener("click", ({ target }) => {
      if (target.classList.contains("OrderButton")) {
        localStorage.clear();
        toHome();
      }
    });
    localStorage.clear();
  }
}
