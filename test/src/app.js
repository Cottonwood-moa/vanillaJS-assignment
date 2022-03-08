import Component from "./core/Component.js";
import Items from "./components/Items.js";
import Template from "./components/template.js";
import api from "./api.js";
export default class App extends Component {
  // 초기 state
  setup() {
    this.$state = {
      count: 1,
    };
    // api 사용시 state에 api data 추가
    (async () => {
      const data = await api();
      this.$state.data = data;
      this.render();
    })();
  }

  // App DOM
  template() {
    return `<main data-component="items"></main>
            <div class="testBtn"></div>
    `;
  }
  // App이 생성된 후 불러올 컴포넌트
  mounted() {
    // 컴포넌트를 삽입할 태그 생성
    const $items = this.$target.querySelector('[data-component="items"]');
    const $testBtn = this.$target.querySelector(".testBtn");
    new Items($items);
    new Template($testBtn, {
      count: this.$state.count,
      json: this.$state.data,
      countEvent: () => {
        this.setState(this.$state.count++);
      },
    });
  }
  // 이벤트 설정
  setEvent() {}
}
