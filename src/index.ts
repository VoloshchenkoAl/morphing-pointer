import './index.scss';
import './app';
import { createGrid } from './modules/grid';

const textElement = document.querySelector('[data-grid]');
createGrid(textElement);

// icons from https://heroicons.com/
