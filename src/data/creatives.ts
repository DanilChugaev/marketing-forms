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

export const subjectsOptions: TreeNode[] = [
  { key: 'all', label: 'Без уточнения предмета' },
  { key: 'physics', label: 'Физика' },
  { key: 'biology', label: 'Биология' },
  { key: 'chemistry', label: 'Химия' },
  { key: 'geography', label: 'География' },
  { key: 'german', label: 'Немецкий' },
  { key: 'history', label: 'История' },
  { key: 'english', label: 'Английский' },
  { key: 'russian', label: 'Русский' },
  { key: 'literature', label: 'Литература' },
  { key: 'social-science', label: 'Обществознание' },
  { key: 'informatics', label: 'Информатика' },
  { key: 'base', label: 'База' },
  { key: 'mathematics', label: 'Математика' },
];

export const genderOptions: LabelValuePair[] = [
  { value: 'female', label: 'Женщины' },
  { value: 'male', label: 'Мужчины' },
];