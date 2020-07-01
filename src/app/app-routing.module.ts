import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './modules/user/menu/menu.component';
import { UserModule } from './modules/user/user.module';

const routes: Routes = [
  // { path: 'login', loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule) },
  // { path: 'login', component: LoginComponent },
  {
    path: '', component: MenuComponent,
    loadChildren: () => UserModule
    // , children: [
    //   { path: '', loadChildren: './user/user.module#UserModule' }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
