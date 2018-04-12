import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthService} from './services/auth.service';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'report',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'report',
        canActivate: [AuthService],
        loadChildren: './views/report/report.module#ReportModule'
      },
      {
        path: 'history',
        canActivate: [AuthService],
        loadChildren: './views/history/history.module#HistoryModule'
      },
      {
        path: 'word',
        canActivate: [AuthService],
        loadChildren: './views/word/word.module#WordModule'
      },
      {
        path: 'profile',
        canActivate: [AuthService],
        loadChildren: './views/profile/profile.module#ProfileModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
export const routing = RouterModule.forRoot(routes, {useHash: true});