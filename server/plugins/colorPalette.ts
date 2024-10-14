import { getColorForSurface, getRgbValues } from '~/ustils/colorPalette';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', async (html) => {
    let error = false;
    let colors: Record<string, string> = {};

    try {
      const { SiteSettings: { Colors: colorPalette } } = await $fetch<{ SiteSettings: { Colors: Record<string, string> } }>('/api/system/');
      colors = colorPalette;
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
      error = true;
    }
    finally {
      html.head.push('<link rel="stylesheet" href="colors.css"/>');
    }

    if (error) return;

    const isDarkBg = colors.isDarkMode === 'true';

    const isPrimaryLight = getColorForSurface(getRgbValues(colors['primary-500'])) === 'black';
    const isSecondaryLight = getColorForSurface(getRgbValues(colors['secondary-500'])) === 'black';

    if (isDarkBg) html.htmlAttrs.push('class="app-dark"');

    colors['primary-surface-color'] = `var(--${isPrimaryLight ? 'black' : 'white'})`;
    colors['secondary-surface-color'] = `var(--${isSecondaryLight ? 'black' : 'white'})`;

    if (!isDarkBg) {
      if (isPrimaryLight) {
        colors['primary-text-button-color'] = `var(--black)`;
      }

      if (isSecondaryLight) {
        colors['secondary-text-button-color'] = `var(--black)`;
      }
    }

    colors['bg-color'] = `var(--${!isDarkBg ? 'white' : 'black'})`;
    colors['text-color'] = `var(--${isDarkBg ? 'white' : 'black'})`;
    colors['shadow-color'] = `var(--${isDarkBg ? 'white-25' : 'black-25'})`;
    colors['text-color-75'] = `var(--${isDarkBg ? 'white-75' : 'black-75'})`;

    const colorsVars = `<style>:root { ${Object.keys(colors).map(el => `--${el}: ${colors[el]};`).join('')} }</style>`;

    html.head.push(colorsVars);
  });
});
