// 컴포넌트화를 위한 뼈대
export default class Component {
  $target;
  $props;
  $state;
  constructor($target, $props) {
    // 초기 렌더
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.setEvent(); // constructor에서 한 번만 실행한다.
  }
  // state setup
  setup() {}
  mounted() {}
  // DOM
  template() {
    return "";
  }
  // template에서 return 하는 DOM요소 HTML에 삽입
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  // 이벤트 설정
  setEvent() {}
  // state 업데이트
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
