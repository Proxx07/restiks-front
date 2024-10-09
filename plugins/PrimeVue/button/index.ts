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
      secondary: {
        color: 'var(--secondary-500)',
        hoverBackground: 'var(--secondary-50)',
        activeBackground: 'var(--secondary-100)',
      },
    },

    outlined: {
      primary: {
        color: 'var(--primary-500)',
        borderColor: 'var(--primary-400)',
      },

      secondary: {
        color: 'var(--secondary-500)',
        borderColor: 'var(--secondary-400)',
        hoverBackground: 'var(--secondary-50)',
        activeBackground: 'var(--secondary-100)',
      },
    },
  };
};
