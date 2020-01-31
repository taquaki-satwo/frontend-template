import 'regenerator-runtime/runtime';
import { msg } from './modules/module';
import '../css/style.css';

if (process.env.NODE_ENV === 'development') {
  console.warn('開発環境');
}

console.log(msg);
