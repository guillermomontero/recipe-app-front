import { createI18n } from 'vue-i18n';
import messageSchema from './message-schema.json';
import en from './en-GB';
import es from './es-ES/translated';

const messages = {
  'es-ES': es,
  'en-GB': en,
};

type MessageSchema = typeof messageSchema;

export default createI18n<[MessageSchema]>({
  legacy: false,
  locale: 'es-ES',
  fallbackLocale: 'en-GB',
  messages
});