export const buttonsConfig = () => {
  return {
    primary: {
      color: 'var(--primary-surface-color)',
      hoverColor: 'var(--primary-surface-color)',
      activeColor: 'var(--primary-surface-color)',
    },

    secondary: {
      color: 'var(--secondary-surface-color)',
      hoverColor: 'var(--secondary-surface-color)',
      activeColor: 'var(--secondary-surface-color)',

      background: 'var(--secondary-500)',
      hoverBackground: 'var(--secondary-600)',
      activeBackground: 'var(--secondary-700)',

      borderColor: 'transparent',
      hoverBorderColor: 'transparent',
      activeBorderColor: 'transparent',
    },

    text: {
      primary: {
        color: 'var(--primary-text-button-color)',
      },

      secondary: {
        color: 'var(--secondary-text-button-color)',
        hoverBackground: 'color-mix(in srgb,var(--secondary-400),transparent 96%)',
        activeBackground: 'color-mix(in srgb,var(--secondary-400),transparent 84%)',
      },
    },

    outlined: {
      primary: {
        color: 'var(--primary-text-button-color)',
        borderColor: 'var(--primary-400)',
      },

      secondary: {
        color: 'var(--secondary-text-button-color)',
        borderColor: 'var(--secondary-400)',
        hoverBackground: 'color-mix(in srgb,var(--secondary-400),transparent 96%)',
        activeBackground: 'color-mix(in srgb,var(--secondary-400),transparent 84%)',
      },
    },
  };
};
