export default defineNitroPlugin((nitroApp) => {
  /*function checkColorForSurface(rgb: number[]) {
    const [r, g, b] = rgb;
    const brightness = (299 * r + 587 * g + 114 * b) / 1000;
    return brightness < 128 ? 'white' : 'black';
  }

  function getRgbValues (str: string) {
    return str.match(/\d+/g)?.map(Number) ?? [0, 0, 0]
  }*/

  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // here will be request
    // const colors = $fetch('/api/colors')
    /*const response = {
      'primary-500': 'rgb(222, 150, 255)',
      'secondary-500': 'rgb(23, 55, 12)'
    };

    const primaryRgb = getRgbValues(response['primary-500'])
    const secondaryRgb = getRgbValues(response['secondary-500'])

    console.log('colorOnPrimaryBg', checkColorForSurface(primaryRgb))
    console.log('colorOnSecondaryBg', checkColorForSurface(secondaryRgb))*/

    const colors = `<style>:root {--primary-500: red}</style>`
    html.head.push('<link rel="stylesheet" href="colors.css"/>')
    html.head.push(colors)
  });
});
