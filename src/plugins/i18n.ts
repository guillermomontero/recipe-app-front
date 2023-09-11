import { createI18n } from 'vue-i18n';
import messageSchema from '../config/locales/message-schema.json';
import en from '../config/locales/en-GB';
import es from '../config/locales/es-ES';

const messages = {
  'es': es,
  'en': en,
};

type MessageSchema = typeof messageSchema;

export const i18n = createI18n<[MessageSchema]>({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('local') || 'es',
  fallbackLocale: 'en',
  availableLocales: ['en', 'es'],
  messages: messages
});
