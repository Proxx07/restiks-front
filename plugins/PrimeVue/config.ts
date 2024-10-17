import type { PrimeVueConfiguration } from 'primevue/config';
import { definePreset } from '@primeuix/styled';
import Aura from '@primevue/themes/aura';

import { buttonPt, buttonsConfig } from './button';
import { cardConfig, cardPt } from './card';
import { datePickerPt } from './datePicker';
import { dialogPt } from './dialog';
import { inputNumberConfig, inputNumberPt } from './inputNumber';
import { inputTextPt } from './inputText';
import { textareaPt } from './textarea';
import { toastConfig } from './toast';
import { toggleButtonConfig, toggleButtonPt } from './toggleButton';

const customPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '.3rem',
      sm: '.5rem',
      md: '.5rem',
      lg: '1rem',
    },
  },

  semantic: {
    primary: {
      50: 'var(--primary-50)',
      100: 'var(--primary-100)',
      200: 'var(--primary-200)',
      300: 'var(--primary-300)',
      400: 'var(--primary-400)',
      500: 'var(--primary-500)',
      600: 'var(--primary-600)',
      700: 'var(--primary-700)',
      800: 'var(--primary-800)',
      900: 'var(--primary-900)',
      950: 'var(--primary-950)',
    },

    formField: {
      paddingX: '.5rem',
      paddingY: '1rem',
    },
  },

  components: {
    button: {
      colorScheme: {
        light: buttonsConfig(),
        dark: buttonsConfig(),
      },
    },

    togglebutton: toggleButtonConfig(),

    toast: toastConfig(),

    card: cardConfig(),

    inputnumber: inputNumberConfig(),
  },
});

export const options: PrimeVueConfiguration = {
  ripple: true,

  pt: {
    button: buttonPt(),

    inputtext: inputTextPt(),

    inputnumber: inputNumberPt(),

    togglebutton: toggleButtonPt(),

    dialog: dialogPt(),

    card: cardPt(),

    datepicker: datePickerPt(),

    textarea: textareaPt(),
  },

  theme: {
    preset: customPreset,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
};
