export interface LabelValuePair {
  label: string;
  value: string;
}

export interface CreativesFormData {
  campaignName: string;         // Название кампании
  creativeTheme: string;        // Тематика креатива
  subject: string;              // Предмет
  usp: string;                  // УТП / Ключевое сообщение
  gender: string;               // Пол целевой аудитории
  age?: number;                 // Возраст ЦА
  mainElement: string;          // Основной элемент креатива
  secondElement?: string;       // Вторичный элемент
  title: string;                // Заголовок
  subTitle: string;             // Подзаголовок
  buttonText: string;           // Текст кнопки
  font: string;                 // Шрифт для текстовых элементов
  style: string;                // Стиль креатива
  background: string;           // Фон креатива
  photo: string;                // Фон креатива
  comments: string;             // Пожелания
  brandBackground: string;      // Брендовый цвет фона
  brandIllustrations: string;   // Брендовый цвет иллюстрации
}