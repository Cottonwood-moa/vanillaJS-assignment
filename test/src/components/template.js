import Component from "../core/Component.js";

export default class Items extends Component {
  // $state->컴포넌트 내부에서 할당하는 state
  // $target->컴포넌트 DOM
  // $props->부모에서 내려온 props
  // 보통 state는 부모요소에서 관리하기 때문에 setup은 필요없고 props로 관리하자.

  // DOM
  template() {
    const { count } = this.$props;
    return `
    <div class="count" data-value="feefefe">
    ${count}
    <button class="count" data-value="feefefe">버튼</button>
    </div>
    `;
  }
  // 이벤트 등록
  setEvent() {
    this.$target.addEventListener("click", ({ target }) => {
      if (target.classList.contains("count")) {
        console.log("testBtn 실행", target.dataset.value);
        this.$props.countEvent();
      }
    });
  }
}
