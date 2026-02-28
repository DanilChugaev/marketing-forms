import { z } from 'zod';

export const creativesFormSchema = z.object({
  webhookUrl: z.string().url(),
  companyName: z.string().min(1, { message: 'Название компании не может быть пустым' }),
  creativeTheme: z.string().min(1, { message: 'Тематика креатива не может быть пустой' }),
  keyMessage: z.string().min(1, { message: 'УТП или ключевое сообщение не может быть пустым' }),
  targetGender: z.array(z.string()).min(1, { message: 'Выберите хотя бы один пол' }),
  targetAge: z.array(z.string()).min(1, { message: 'Выберите хотя бы один возраст' }),
  creativeStyles: z.array(z.string()).min(1, { message: 'Выберите хотя бы один стиль креатива' }),
  colorSchemes: z.array(z.string()).min(1, { message: 'Выберите хотя бы одну цветовую схему' }),
  creativeSizes: z.array(z.string()).min(1, { message: 'Выберите хотя бы один размер креатива' }),
});

export const semanticsFormSchema = z.object({
  parsePhrases: z.string().min(1, { message: 'Введите хотя бы одну фразу для парсинга' }),
  includeMasks: z.enum(['yes', 'no'], { message: 'Выберите, добавлять ли маски в проект' }),
  clusterPhrases: z.enum(['yes', 'no'], { message: 'Выберите, кластеризовать ли фразы' }),
});