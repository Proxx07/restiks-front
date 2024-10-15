import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';

function pluralRuleRU(choice: number) {
  const numbString = choice.toString();
  if (choice % 10 !== 0 && numbString.length > 2) {
    choice = Number(numbString.slice(-2));
  }
  const end = choice % 10;
  const ten = choice > 10 && choice < 20;
  if (choice === 0) return 0;
  if (end === 0) return 2;
  if (ten) return 2;
  if (end === 1) return 1;
  if (end > 1 && end < 5) return 3;
  return 2;
}

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'ru',
  globalInjection: true,
  pluralRules: {
    ru: pluralRuleRU,
  },
  messages: { ru, en, uz },
}));
