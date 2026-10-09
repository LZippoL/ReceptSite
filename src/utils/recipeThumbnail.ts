import manifest from '../data/recipeImageVariants.json';

type Variant = { path: string; width: number; height: number; bytes: number };
const variantsByImage: Record<string, Variant[]> = manifest;
export function recipeImageProps(image: string | undefined, sizes = '(min-width: 1280px) 288px, (min-width: 1024px) 30vw, (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 32px)') {
  const variants = image ? variantsByImage[image] : undefined;
  if (!variants?.length) return { src: image };
  const preferred = variants.find(variant => variant.width >= 640) || variants[variants.length - 1];
  return {
    src: `${import.meta.env.BASE_URL}${preferred.path}`,
    srcSet: variants.map(variant => `${import.meta.env.BASE_URL}${variant.path} ${variant.width}w`).join(', '),
    sizes: `auto, ${sizes}`,
    width: preferred.width,
    height: preferred.height
  };
}
