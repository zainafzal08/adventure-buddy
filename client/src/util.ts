import { html } from 'lit-html';

export function getNavigateEvent(target: string) {
  return new CustomEvent('navigate', {
    bubbles: true,
    composed: true,
    detail: {
      target,
    },
  });
}

export function renderModifier(n: number, emphasis: boolean = false) {
  const val = n > 0 ? `+${n}` : `${n}`;
  let color = 'var(--theme-emphasis-low)';
  if (emphasis) {
    color = 'var(--theme-emphasis)';
  } else if (n > 0) {
    color = 'var(--theme-emphasis-high)';
  }
  return html`
    <span style="color: ${color}">${val}</span>
  `;
}

export function exhaustiveCheck(param: never) {}
