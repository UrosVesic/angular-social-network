import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostComponent } from './post/all-posts/post.component';
import { ReactionComponent } from './reaction/reaction.component';
import { SideComponent } from './shared/side/side.component';
import { TopicSideComponent } from './shared/topic-side/topic-side.component';
import { CreateTopicComponent } from './topic/create-topic/create-topic.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListTopicsComponent } from './topic/list-topics/list-topics.component';
import { RequestInterceptor } from './auth/request-interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './profile/user-profile/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuggestedUsersComponent } from './shared/suggested-users/suggested-users.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { ChangeProfileComponent } from './profile/change-profile/change-profile.component';
import { PanelComponent } from './admin/panel/panel.component';
import { ReportedPostComponent } from './report/unsolved-reported-posts/reported-post.component';
import { SolvedReportedPostComponent } from './report/solved-reported-post/solved-reported-post.component';
import { SearchComponent } from './search/search/search.component';
import { ReportedUsersComponent } from './user/reported-users/reported-users.component';
import { ChatComponent } from './chat/chat/chat.component';
import { InboxComponent } from './chat/inbox/inbox/inbox.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    ReactionComponent,
    SideComponent,
    TopicSideComponent,
    CreateTopicComponent,
    CreatePostComponent,
    ListTopicsComponent,
    ViewPostComponent,
    UserProfileComponent,
    SuggestedUsersComponent,
    UpdatePostComponent,
    AllUsersComponent,
    ChangeProfileComponent,
    PanelComponent,
    ReportedPostComponent,
    SolvedReportedPostComponent,
    SearchComponent,
    ReportedUsersComponent,
    ChatComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    EditorModule,
    NgbModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
