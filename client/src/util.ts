export function getNavigateEvent(target:string) {
    return new CustomEvent('navigate', {
        bubbles: true,
        composed: true,
        detail: {
          target
        }
    });
}