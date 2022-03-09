import Component from "../core/Component.js";

export default class Breadcrumb extends Component {
  template() {
    const { path } = this.$props;
    return `
    <div>
    ${path.join(" - ")}
    </div>
    `;
  }
}
