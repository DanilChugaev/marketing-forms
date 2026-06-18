export interface LabelValuePair<T = string> {
  label: string;
  value: T;
}

export enum SubjectKey {
  All = 'all',
  Physics = 'Физика',
  Biology = 'Биология',
  Chemistry = 'Химия',
  Geography = 'География',
  German = 'Немецкий',
  History = 'История',
  English = 'Английский',
  Russian = 'Русский',
  Literature = 'Литература',
  SocialStudies = 'Обществознание',
  ComputerScience = 'Информатика',
  Base = 'База',
  Math = 'Математика',
}

export interface GenericTreeNode<TKey extends string = string> {
  key: TKey;
  label: string;
  children?: GenericTreeNode<TKey>[];
}

export interface CreativesFormData {
  campaignName: string; // Название кампании
  creativeTheme: string; // Тематика креатива
  subject: string; // Предмет
  usp: string; // УТП / Ключевое сообщение
  gender: string; // Пол целевой аудитории
  age?: number; // Возраст ЦА
  mainElement: string; // Основной элемент креатива
  secondElement?: string; // Вторичный элемент
  title: string; // Заголовок
  subTitle: string; // Подзаголовок
  buttonText: string; // Текст кнопки
  font: string; // Шрифт для текстовых элементов
  style: string; // Стиль креатива
  background: string; // Фон креатива
  photo: string; // Фон креатива
  comments: string; // Пожелания
  brandBackground: string; // Брендовый цвет фона
  brandIllustrations: string; // Брендовый цвет иллюстрации
}

export interface CampaignFormData {
  id: string; // ID кампании
}

export interface StatisticsFormData {
  id: string; // ID тг чата
  ids: string; // ID кампаний
  specialist: string; // Справочник специалиста
}

export interface SemanticsFormData {
  reportName: string; // Имя отчета
  parsePhrases: string; // Фразы для парсинга
  minFrequency: number; // Минимальная частотность
  maxFrequency: number; // Максимальная частотность
  positivePhrases: string; // Фразы которые должны содержать любую из строк
  negativePhrases: string; // Фразы которые не должны содержать любую из строк
  region: number; // Регион
  viewingDepth: number; // Глубина просмотра
  minKeyWeight: number; // Минимальный вес ключа
  clusterPhrases: boolean; // Требуется кластеризация фраз
  popularSourcePhrasesForms: boolean; // Использовать самые популярные формы исходных фраз
  excludeSourcePhrases: boolean; // Исключить исходные фразы из отчета
}
