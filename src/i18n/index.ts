export type { Translations } from './types';
export { en as t } from './en';

export function avatarSrc(style: string, seed: string) {
  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&size=28&backgroundColor=111215,7f3dee,1b1c24,e9a82f,0c0c12`;
}
