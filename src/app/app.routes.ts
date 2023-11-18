import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/index.page/index.page.component'),
  },
  {
    path: 'concatenator',
    loadComponent: () =>
      import('./pages/concatenator.page/concatenator.page.component'),
  },
  {
    path: 'cleaner',
    loadComponent: () => import('./pages/cleaner.page/cleaner.page.component'),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects.page/projects.page.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/projects.page/loader/loader.component'),
      },
      {
        path: 'classifier',
        loadComponent: () =>
          import('./pages/projects.page/classifier/classifier.component'),
      },
      {
        path: 'structurer',
        loadComponent: () =>
          import('./pages/projects.page/structurer/structurer.component'),
      },
    ],
  },
];
