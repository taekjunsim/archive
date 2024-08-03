declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}

// declare module "*.scss" {
//   const content: { [className: string]: string };
//   export = content;
// }

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export const src: string;

  export default React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}
