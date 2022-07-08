import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin/admin.guard';
import { PanelComponent } from './admin/panel/panel.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { ChangeProfileComponent } from './profile/change-profile/change-profile.component';
import { CreateTopicComponent } from './topic/create-topic/create-topic.component';
import { ListTopicsComponent } from './topic/list-topics/list-topics.component';
import { AllUsersComponent } from './user/all-users/all-users.component';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'admin', component: PanelComponent, canActivate: [AdminGuard] },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-topic',
    component: CreateTopicComponent,
    canActivate: [AuthGuard],
  },
  { path: 'list-topics', component: ListTopicsComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'update-post/:id', component: UpdatePostComponent },
  { path: 'all-users/:info', component: AllUsersComponent },
  { path: 'change-profile/:username', component: ChangeProfileComponent },
  {
    path: 'user-profile/:username',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
