declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

type ReactTemplateCreatorChildrenType = {
  type: string;
  placeholder?: string;
  options: ReactTemplateCreatorOptionType[];
}

type ReactTemplateCreatorOptionType = {
  label: string;
  value: string;
  meta?: {
    uniqId: string;
  };
  children: ReactTemplateCreatorChildrenType[];
};
