import type { ToastMessageOptions } from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

type ToastsSeverity = Exclude<ToastMessageOptions['severity'], undefined>;

export const useToastStore = defineStore('toasts', () => {
  const $toast = useToast();
  const duration = 3500;

  const defaultTitles: Partial<Record<ToastsSeverity, string>> = {
    success: 'Успешно',
    error: 'Ошибка',
    warn: 'Предупреждение',
    info: 'Внимание',
  };

  const fireToast = (severity: ToastsSeverity, title: string, text?: string) => {
    const summary = !text ? defaultTitles[severity] : title;
    const detail = !text ? title : text;
    $toast.add({ severity, summary, detail, life: duration });
  };

  const success = (title: string, text?: string) => fireToast('success', title, text);

  const info = (title: string, text?: string) => fireToast('info', title, text);

  const warning = (title: string, text?: string) => fireToast('warn', title, text);

  const error = (title: string, text?: string) => fireToast('error', title, text);

  return {
    success,
    info,
    warning,
    error,
  };
});
