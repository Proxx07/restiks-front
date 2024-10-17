import { getColorForSurface, getRgbValues } from '~/ustils/colorPalette';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', async (html) => {
    let error = false;
    let colors: Record<string, string> = {
      'primary-50': 'rgb(255, 237, 234)',
      'primary-100': 'rgb(255, 200, 192)',
      'primary-200': 'rgb(252, 162, 151)',
      'primary-300': 'rgb(245, 122, 110)',
      'primary-400': 'rgb(235, 76, 67)',
      'primary-500': 'rgb(229, 45, 43)',
      'primary-600': 'rgb(199, 38, 36)',
      'primary-700': 'rgb(170, 31, 29)',
      'primary-800': 'rgb(142, 24, 22)',
      'primary-900': 'rgb(114, 17, 16)',
      'primary-950': 'rgb(88, 11, 10)',
      'secondary-50': 'rgb(253, 253, 253)',
      'secondary-100': 'rgb(248, 248, 248)',
      'secondary-200': 'rgb(243, 243, 243)',
      'secondary-300': 'rgb(238, 238, 238)',
      'secondary-400': 'rgb(233, 233, 233)',
      'secondary-500': 'rgb(231, 231, 231)',
      'secondary-600': 'rgb(201, 201, 201)',
      'secondary-700': 'rgb(171, 171, 171)',
      'secondary-800': 'rgb(143, 143, 143)',
      'secondary-900': 'rgb(115, 115, 115)',
      'secondary-950': 'rgb(89, 89, 89)',
      'isDarkMode': 'false',
    };

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

    // if (error) return;
    // colors.isDarkMode = 'true';
    const isDarkBg = colors.isDarkMode === 'true';

    const isPrimaryLight = getColorForSurface(getRgbValues(colors['primary-500'])) === 'black';
    const isSecondaryLight = getColorForSurface(getRgbValues(colors['secondary-500'])) === 'black';

    colors['primary-surface-color'] = `var(--${isPrimaryLight ? 'black' : 'white'})`;
    colors['secondary-surface-color'] = `var(--${isSecondaryLight ? 'black' : 'white'})`;

    if (isDarkBg) {
      html.htmlAttrs.push('class="app-dark"');
    }
    else {
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
