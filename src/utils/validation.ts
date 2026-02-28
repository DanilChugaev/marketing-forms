import { z } from 'zod';

const webhookUrlSchema = z.string().url();
const textSchema = z.string().min(1, { message: 'Поле не может быть пустым' });

export const creativesFormSchema = z.object({
  webhookUrl: webhookUrlSchema,
  companyName: textSchema,
  creativeTheme: textSchema,
  keyMessage: textSchema,
  targetGender: z.array(z.string()).min(1, { message: 'Выберите хотя бы один пол' }),
  targetAge: z.array(z.string()).min(1, { message: 'Выберите хотя бы один возраст' }),
  creativeStyles: z.array(z.string()).min(1, { message: 'Выберите хотя бы один стиль креатива' }),
  colorSchemes: z.array(z.string()).min(1, { message: 'Выберите хотя бы одну цветовую схему' }),
  creativeSizes: z.array(z.string()).min(1, { message: 'Выберите хотя бы один размер креатива' }),
});