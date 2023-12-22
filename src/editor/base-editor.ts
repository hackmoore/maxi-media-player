import { css, LitElement } from 'lit';
import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import { property } from 'lit/decorators.js';
import { CardConfig } from '../types';
import Store from '../model/store';
import { dispatch } from '../utils/utils';

export abstract class BaseEditor extends LitElement {
  @property({ attribute: false }) config!: CardConfig;
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) store!: Store;

  setConfig(config: CardConfig) {
    this.config = structuredClone(config);
  }
  static get styles() {
    return css`
      ha-svg-icon {
        margin: 5px;
      }
      ha-control-button {
        white-space: nowrap;
      }
      ha-control-button-group {
        margin: 5px;
      }
      div {
        margin-top: 20px;
      }
    `;
  }

  protected configChanged() {
    fireEvent(this, 'config-changed', { config: this.config });
    this.requestUpdate();
  }
  protected dispatchClose() {
    return dispatch('closed');
  }
}
