import { type LabelValuePair, type GenericTreeNode, SubjectKey } from '../types.ts';

export const formatOptions: LabelValuePair[] = [
  { value: '1080x1080', label: '1080x1080 (ТГО)' },
  { value: '1080x607', label: '1080x607 (ТГО)' },
  { value: '200x400', label: '200x400 (ГО десктопы)' },
  { value: '300x250', label: '300x250 (ГО десктопы)' },
  { value: '300x500', label: '300x500 (ГО десктопы)' },
  { value: '300x600', label: '300x600 (ГО десктопы)' },
  { value: '336x280', label: '336x280 (ГО десктопы)' },
  { value: '728x90', label: '728x90 (ГО десктопы)' },
  { value: '970x250', label: '970x250 (ГО десктопы)' },
  { value: '640x100', label: '640x100 (ГО мобилки)' },
  { value: '640x200', label: '640x200 (ГО мобилки)' },
  { value: '640x960', label: '640x960 (ГО мобилки)' },
  { value: '940x640', label: '940x640 (ГО мобилки)' },
];

export const subjectOptions: GenericTreeNode<SubjectKey>[] = [
  { key: SubjectKey.All, label: 'Без уточнения предмета' },
  { key: SubjectKey.Physics, label: 'Физика' },
  { key: SubjectKey.Biology, label: 'Биология' },
  { key: SubjectKey.Chemistry, label: 'Химия' },
  { key: SubjectKey.Geography, label: 'География' },
  { key: SubjectKey.German, label: 'Немецкий' },
  { key: SubjectKey.History, label: 'История' },
  { key: SubjectKey.English, label: 'Английский' },
  { key: SubjectKey.Russian, label: 'Русский' },
  { key: SubjectKey.Literature, label: 'Литература' },
  { key: SubjectKey.SocialStudies, label: 'Обществознание' },
  { key: SubjectKey.ComputerScience, label: 'Информатика' },
  { key: SubjectKey.Base, label: 'База' },
  { key: SubjectKey.Math, label: 'Математика' },
];

export const genderOptions: LabelValuePair[] = [
  { value: 'мужской', label: 'Мужчины' },
  { value: 'женский', label: 'Женщины' },
];

export const brandBackgroundOptions: Record<SubjectKey, string> = {
  [SubjectKey.All]: 'FF9B50, FFCDA1, FFF3E0',
  [SubjectKey.Physics]: '51C4EA, 9FEDFE, CBFDFD',
  [SubjectKey.Biology]: '5DC83A, C3F97F, FBFA8E',
  [SubjectKey.Chemistry]: 'D951D1, ED6DDA, F09AF1',
  [SubjectKey.Geography]: '61C996, 7CFBD2, BBFDF1',
  [SubjectKey.German]: 'BDAE74, E3D57B, FDF5C7',
  [SubjectKey.History]: 'C93C4F, EC4E65, F3A4A9',
  [SubjectKey.English]: '3679D0, 87BCF2, B9DCFC',
  [SubjectKey.Russian]: 'D6844C, F1A362, F6CFA6',
  [SubjectKey.Literature]: '7772D8, 9C94F7, CAD1FB',
  [SubjectKey.SocialStudies]: 'E1C95A, FBE84C, FDF684',
  [SubjectKey.ComputerScience]: '7D3AE2, 9458F6, B78CF8',
  [SubjectKey.Base]: '717FAA, 8E9BCF, B1C0E9',
  [SubjectKey.Math]: '7D8AB6, 9BACDA, CCD9FC',
};

export const brandIllustrationsOptions: Record<SubjectKey, string> = {
  [SubjectKey.All]: 'FF7E3A',
  [SubjectKey.Physics]: 'FDC776',
  [SubjectKey.Biology]: '66B1FF',
  [SubjectKey.Chemistry]: '93FFCD',
  [SubjectKey.Geography]: 'EF954C',
  [SubjectKey.German]: 'CF8BF3',
  [SubjectKey.History]: '93F122',
  [SubjectKey.English]: '60FF64',
  [SubjectKey.Russian]: '50F3FF',
  [SubjectKey.Literature]: 'DBFF6A',
  [SubjectKey.SocialStudies]: 'FF78A7',
  [SubjectKey.ComputerScience]: 'FFCB4C',
  [SubjectKey.Base]: 'FFEB28',
  [SubjectKey.Math]: 'FFEB28',
};
