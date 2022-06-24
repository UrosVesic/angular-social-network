import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateTopicComponent } from './topic/create-topic/create-topic.component';
import { ListTopicsComponent } from './topic/list-topics/list-topics.component';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'create-topic', component: CreateTopicComponent },
  { path: 'list-topics', component: ListTopicsComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'user-profile/:username', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
