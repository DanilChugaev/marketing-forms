import type { LabelValuePair } from '../types.ts';
import type { TreeNode } from 'primevue/treenode';

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

export const subjectOptions: TreeNode[] = [
  { key: 'all', label: 'Без уточнения предмета' },
  { key: 'Физика', label: 'Физика' },
  { key: 'Биология', label: 'Биология' },
  { key: 'Химия', label: 'Химия' },
  { key: 'География', label: 'География' },
  { key: 'Немецкий', label: 'Немецкий' },
  { key: 'История', label: 'История' },
  { key: 'Английский', label: 'Английский' },
  { key: 'Русский', label: 'Русский' },
  { key: 'Литература', label: 'Литература' },
  { key: 'Обществознание-science', label: 'Обществознание' },
  { key: 'Информатика', label: 'Информатика' },
  { key: 'База', label: 'База' },
  { key: 'Математика', label: 'Математика' },
];

export const genderOptions: LabelValuePair[] = [
  { value: 'мужской', label: 'Мужчины' },
  { value: 'женский', label: 'Женщины' },
];

export const brandBackgroundOptions: Record<string, string> = {
  all: 'FF9B50, FFCDA1, FFF3E0',
  physics: '51C4EA, 9FEDFE, CBFDFD',
  biology: '5DC83A, C3F97F, FBFA8E',
  chemistry: 'D951D1, ED6DDA, F09AF1',
  geography: '61C996, 7CFBD2, BBFDF1',
  german: 'BDAE74, E3D57B, FDF5C7',
  history: 'C93C4F, EC4E65, F3A4A9',
  english: '3679D0, 87BCF2, B9DCFC',
  russian: 'D6844C, F1A362, F6CFA6',
  literature: '7772D8, 9C94F7, CAD1FB',
  social: 'E1C95A, FBE84C, FDF684',
  informatics: '7D3AE2, 9458F6, B78CF8',
  base: '717FAA, 8E9BCF, B1C0E9',
  mathematics: '7D8AB6, 9BACDA, CCD9FC',
};

export const brandIllustrationsOptions: Record<string, string> = {
  all: 'FF7E3A',
  physics: 'FDC776',
  biology: '66B1FF',
  chemistry: '93FFCD',
  geography: 'EF954C',
  german: 'CF8BF3',
  history: '93F122',
  english: '60FF64',
  russian: '50F3FF',
  literature: 'DBFF6A',
  social: 'FF78A7',
  informatics: 'FFCB4C',
  base: 'FFEB28',
  mathematics: 'FFEB28',
};