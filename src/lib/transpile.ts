import { transform } from '@babel/standalone';

export function transpile(code: string): string {
  return transform(code, { presets: ['react'] }).code as string;
}
