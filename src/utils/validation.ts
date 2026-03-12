import { z } from 'zod';

export const creativesFormSchema = z.object({
  webhookUrl: z.string().url({ message: 'Некорректная ссылка на вебхук' }),
  campaignName: z.string().min(1, { message: 'Название кампании не может быть пустым' }),
  creativeTheme: z.string().min(1, { message: 'Тематика креатива не может быть пустой' }),
  subjects: z.array(z.string()).min(1, { message: 'Выберите хотя бы одно значение' }),
  usp: z.string().min(1, { message: 'УТП или ключевое сообщение не может быть пустым' }),
  gender: z.array(z.string()).min(1, { message: 'Выберите хотя бы один пол' }),
  age: z.string().min(1, { message: 'Выберите хотя бы один возраст' }),
  mainElement: z.string().min(1, { message: 'Основной элемент не может быть пустым' }),
  // блок с брендовыми цветами
});

export const semanticsFormSchema = z.object({
  webhookUrl: z.string().url({ message: 'Некорректная ссылка на вебхук' }),
  parsePhrases: z.string().min(1, { message: 'Введите хотя бы одну фразу для парсинга' }),
  includeMasks: z.enum(['yes', 'no'], { message: 'Выберите, добавлять ли маски в проект' }),
  clusterPhrases: z.enum(['yes', 'no'], { message: 'Выберите, кластеризовать ли фразы' }),
});