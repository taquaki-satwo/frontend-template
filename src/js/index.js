import { msg } from './modules/module';

if (process.env.NODE_ENV === 'development') {
  console.warn('開発環境');
}

console.log(msg);
