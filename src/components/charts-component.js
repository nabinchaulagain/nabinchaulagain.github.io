import { LitElement, html, css } from 'lit-element';

import '@google-web-components/google-chart';

const SHAPES = ['triangle', 'square', 'diamond', 'star', 'polygon'];
const SCALE_TYPES = ['log', 'linear'];

function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class ChartsComponent extends LitElement {
  static get properties() {
    return { formData: { type: Object }, points: { type: Array } };
  }

  constructor() {
    super();

    this.formData = {};

    this.calculateDataPoints();

    this.handleChange = this.handleChange.bind(this);
  }

  static get styles() {
    return css`
      input,
      select {
        display: block;
        margin-bottom: 8px;
      }

      form {
        width: 500px;
        margin: auto;
      }

      google-chart {
        width: 800px;
        height: 500px;
        margin: auto;
      }
    `;
  }

  handleChange(event) {
    const targetElement = event.target;

    const { fieldKey } = targetElement.dataset;

    this.formData = { ...this.formData, [fieldKey]: targetElement.value };
  }

  calculateDataPoints() {
    const NUM_POINTS = 20;
    let current = 1;
    const rawData = new Array(NUM_POINTS * 3).fill(0).map((_, index) => {
      const random = generateRandomNumber(1, 50);

      current += 1;
      return index % 3 === 0 ? current + 3 : random;
    });

    this.points = rawData.reduce(
      (acc, curr) => {
        if (acc[acc.length - 1].length < 3) {
          acc[acc.length - 1].push(curr);
        } else {
          acc.push([curr]);
        }

        return acc;
      },
      [[]],
    );
  }

  renderInputs() {
    return html`
      <form
        @submit="${ev => {
          ev.preventDefault();

          this.shadowRoot.querySelector('google-chart').redraw();
          this.calculateDataPoints();
        }}"
      >
        <input
          placeholder="X axis label"
          data-field-key="xAxisLabel"
          @change="${this.handleChange}"
        />
        <input
          placeholder="Y axis label"
          data-field-key="yAxisLabel"
          @change="${this.handleChange}"
        />
        <input
          placeholder="X axis min value"
          data-field-key="xAxisMinValue"
          @change="${this.handleChange}"
        />
        <input
          placeholder="Y axis min value"
          data-field-key="yAxisMinValue"
          @change="${this.handleChange}"
        />
        <select
          @change="${ev => {
            if (ev.target.value === '0') {
              return;
            }

            this.handleChange(ev);
          }}"
          data-field-key="xAxisScaleType"
        >
          <option value="0">Select X axis scale type:</option>
          ${SCALE_TYPES.map(
            scale => html`<option .value="${scale}">${scale}</option>`,
          )}
        </select>
        <select
          @change="${ev => {
            if (ev.target.value === '0') {
              return;
            }

            this.handleChange(ev);
          }}"
          data-field-key="yAxisScaleType"
        >
          <option value="0">Select Y axis scale type::</option>
          ${SCALE_TYPES.map(
            scale => html`<option .value="${scale}">${scale}</option>`,
          )}
        </select>
        <select
          @change="${ev => {
            if (ev.target.value === '0') {
              return;
            }

            this.handleChange(ev);
          }}"
          data-field-key="shape"
        >
          <option value="0">Select Shape:</option>
          ${SHAPES.map(
            shape => html`<option .value="${shape}">${shape}</option>`,
          )}
        </select>
        <input type="submit" value="Randomly generate points" />
      </form>
    `;
  }

  getOptions() {
    return {
      hAxis: {
        title: this?.formData?.xAxisLabel,
        scaleType: this.formData?.xAxisScaleType === 'log' ? 'log' : null,
        viewWindow: { min: this.formData?.xAxisMinValue || null },
      },
      vAxis: {
        title: this?.formData?.yAxisLabel,
        scaleType: this.formData?.yAxisScaleType === 'log' ? 'log' : null,
        viewWindow: { min: this.formData?.yAxisMinValue || null },
      },
      pointSize: 10,
      width: 800,
      height: 500,
      colors: ['#aa5500', '#00aa55'], // Colors for each of the 2 series.
      pointShape: this.formData?.shape || 'circle',
    };
  }

  renderChart() {
    return html`<google-chart
      .cols="${[
        {
          type: 'number',
          label: this?.formData?.xAxisLabel,
        },
        { type: 'number', label: 'Series 1' },
        { type: 'number', label: 'Series 2' },
      ]}"
      type="line"
      .options="${this.getOptions()}"
      .rows="${this.points}"
    ></google-chart>`;
  }

  render() {
    return [this.renderChart(), this.renderInputs()];
  }
}

window.customElements.define('charts-component', ChartsComponent);
