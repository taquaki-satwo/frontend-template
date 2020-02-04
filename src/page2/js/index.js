import 'regenerator-runtime/runtime';
import { msg } from './modules/module';
import '../css/index.css';

if (process.env.NODE_ENV === 'development') {
  console.warn('Development');
}

console.log('TOP', msg);
