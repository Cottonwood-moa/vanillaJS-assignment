import Component from "../core/Component.js";

export default class ProductListPage extends Component {
  // $state->컴포넌트 내부에서 할당하는 state
  // $target->컴포넌트 DOM
  // $props->부모에서 내려온 props
  // 보통 state는 부모요소에서 관리하기 때문에 setup은 필요없고 props로 관리하자.
  // GET - https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products
  // DOM
  template() {
    const { items } = this.$props;
    console.log(items);
    if (!items) {
      return `로딩중`;
    } else {
      return `<h1>상품목록</h1>
        <ul>
        ${items
          .map(
            (item) =>
              `
        <li class="Product">
        <img src="${item.imageUrl}" class="toDetail" data-id="${item.id}">
        <div class="Product__info">
          <div>${item.name}</div>
          <div>${item.price}</div>
        </div>
      </li>
        `
          )
          .join("")}
        </ul>
        `;
    }
  }
  // 이벤트 등록
  setEvent() {
    const { toDetail } = this.$props;
    this.$target.addEventListener("click", ({ target }) => {
      if (target.classList.contains("toDetail")) {
        console.log("Detail로 이동 ", target.dataset.id);
        toDetail(target.dataset.id);
      }
    });
  }
}
