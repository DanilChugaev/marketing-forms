import { z } from 'zod';

export const creativesFormSchema = z.object({
  webhookUrl: z.string().url({ message: 'Некорректная ссылка на вебхук' }),
  campaignName: z.string().min(1, { message: 'Название кампании не может быть пустым' }),
  theme: z.string().min(1, { message: 'Тематика креатива не может быть пустой' }),
  usp: z.string().min(1, { message: 'УТП или ключевое сообщение не может быть пустым' }),
  audienceGender: z.array(z.string()).min(1, { message: 'Выберите хотя бы один пол' }),
  audienceAge: z.array(z.string()).min(1, { message: 'Выберите хотя бы один возраст' }),
  style: z.array(z.string()).min(1, { message: 'Выберите хотя бы один стиль креатива' }),
  colors: z.array(z.string()).min(1, { message: 'Выберите хотя бы одну цветовую схему' }),
  format: z.array(z.string()).min(1, { message: 'Выберите хотя бы один размер креатива' }),
});

export const semanticsFormSchema = z.object({
  webhookUrl: z.string().url({ message: 'Некорректная ссылка на вебхук' }),
  parsePhrases: z.string().min(1, { message: 'Введите хотя бы одну фразу для парсинга' }),
  includeMasks: z.enum(['yes', 'no'], { message: 'Выберите, добавлять ли маски в проект' }),
  clusterPhrases: z.enum(['yes', 'no'], { message: 'Выберите, кластеризовать ли фразы' }),
});