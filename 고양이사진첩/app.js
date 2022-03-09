import Component from "./core/Component.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import api from "./api/api.js";
export default class App extends Component {
  setup() {
    this.$state = {
      path: ["root"],
      prevId: [],
      isLoading: false,
    };
    (async () => {
      try {
        this.$state.isLoading = true;
        this.render();
        const data = await api();
        this.$state.data = data;
        this.$cache.root = data;
        this.$state.isLoading = false;
        this.render();
      } catch (e) {
        alert("에러가 발생했습니다.");
      }
    })();
    this.$cache = {};
  }

  template() {
    return `
            ${
              this.$state.isLoading
                ? `<div class="Loading"><div class="spinner"></div></div>`
                : ``
            }
            <div class="Breadcrumb"></div>
            <div class="Nodes"></div>
    `;
  }
  mounted() {
    const $Nodes = document.querySelector(".Nodes");
    const $Breadcrumb = document.querySelector(".Breadcrumb");
    new Breadcrumb($Breadcrumb, { path: this.$state.path });
    new Nodes($Nodes, {
      data: this.$state.data,
      path: this.$state.path,
      folderClick: async (id, name) => {
        try {
          this.setState({ isLoading: true });
          if (this.$cache[id]) {
            this.$state.path.push(name);
            this.$state.prevId.push(id);
            this.setState({ data: [...this.$cache[id]], isLoading: false });
          } else {
            const newData = await api(id);
            this.$cache = { ...this.$cache, [id]: newData };
            this.$state.path.push(name);
            this.$state.prevId.push(id);
            this.setState({ data: [...newData], isLoading: false });
          }
        } catch (e) {
          alert("에러가 발생했습니다.", e);
        } finally {
        }
      },
      prevClick: () => {
        this.$state.path.pop();
        this.$state.prevId.pop();
        if (this.$state.prevId.length >= 1) {
          const prevID = this.$state.prevId[this.$state.prevId.length - 1];
          this.setState({ data: [...this.$cache[prevID]] });
        } else {
          this.setState({ data: [...this.$cache.root] });
        }
      },
    });
  }
}
