import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/index.page/index.page.component')
    },
    {
        path:'concatenator',
        loadComponent: () => import('./pages/concatenator.page/concatenator.page.component')
    },
    {
        path:'cleaner',
        loadComponent: () => import('./pages/cleaner.page/cleaner.page.component')
    },
    {
        path:'projects',
        loadComponent: () => import('./pages/projects.page/projects.page.component')
    },
];
