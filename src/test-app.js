import { LitElement, html } from 'lit-element';

import './components/charts-component';

class TestApp extends LitElement {
  /**
   * Renders the main module component.
   *
   * @returns {String} The html template string.
   */
  render() {
    return html`
      <main>
        <charts-component></charts-component>
      </main>
    `;
  }
}

customElements.define('test-app', TestApp);
