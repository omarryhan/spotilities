type BackgroundSubmenuSections = 'colors' | 'gradient' | 'border';
type ImageSubmenuSections = 'stock' | 'custom';
type TextSubmenuSections = 'content' | 'style';
// export type SubmenuSections = BackgroundSubmenuSections |
// ImageSubmenuSections | TextSubmenuSections;

export const menuSections: {
  [key: string]: Array<
  BackgroundSubmenuSections
  > | Array<
  ImageSubmenuSections
  > | Array<
  TextSubmenuSections
  >;
} = {
  background: [
    'colors',
    'gradient',
    'border',
  ],
  image: [
    'stock',
    'custom',
  ],
  text: [
    'content',
    'style',
  ],
};
