import { useToast } from 'primevue/usetoast';

type NotifyType = 'success' | 'error'
type NotifyMessage = string

export function useNotifications() {
  const toast = useToast();
  const life = 3000;

  const notify = (type: NotifyType, message: NotifyMessage) => {
    toast.add({
      severity: type,
      summary: message,
      life,
    });
  };

  const successNotify = (message: NotifyMessage) => notify('success', message);
  const errorNotify = (message: NotifyMessage) => notify('error', message);


  return {
    successNotify,
    errorNotify,
  };
}
