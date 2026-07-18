import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading } from '@angular/router';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { CoachLayoutComponent } from './layouts/coach-layout/coach-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotFoundComponent } from './views/not-found/not-found/not-found/not-found.component';
import { MeetComponent } from './views/student/meet/meet.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentGuard } from './guards/student.guard';
import { CoachGuard } from './guards/coach.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  //////////////////////  '' ////////////////////////
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      {
        path: 'student/profile1/:id',
        loadChildren: () =>
          import('./views/student/getcertifcates/getcertifcates.module').then(
            (m) => m.GetcertifcatesModule
          ),
      },

      {
        path: '',
        loadChildren: () =>
          import('./views/visitor/home/home.module').then((m) => m.HomeModule),
      },
      // {
      //   path: 'contact',
      //   loadChildren: () =>
      //     import('./views/visitor/contact/contact.module').then(
      //       (m) => m.ContactModule
      //     ),
      // },
      {
        path: 'contacts/:category',
        loadChildren: () =>
        import('./views/visitor/contacts/contacts.module').then(
          (m) => m.ContactsModule
        )
      },
      {
        path: 'hackerspace/:region',
        loadChildren: () =>
          import('./views/visitor/hackerspace/hackerspace.module').then(
            (m) => m.HackerspaceModule
          ),
      },
      {
        path: 'training/:formation',
        loadChildren: () =>
          import('./views/visitor/training/training.module').then(
            (m) => m.TrainingModule
          ),
      },
      {
        path: 'login',
        canActivate: [LoginGuard],
        loadChildren: () =>
          import('./views/visitor/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'signup',
        loadChildren: () =>
        import('./views/visitor/signup/signup.module').then(m => m.SignupModule) },
      {
        path: 'forgotpassword',
        loadChildren: () =>
          import('./views/visitor/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: 'resetpassword',
        loadChildren: () =>
          import('./views/visitor/reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule
          ),
      },
      {
        path: 'verifyemail',
        loadChildren: () =>
          import('./views/visitor/verify-email/verify-email.module').then(
            (m) => m.VerifyEmailModule
          ),
      },
      {
        path: 'online',
        loadChildren: () =>
          import('./views/visitor/online/online.module').then(
            (m) => m.OnlineModule
          ),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./views/visitor/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'project-details/:id',
        loadChildren: () =>
          import('./views/visitor/detailprojects/detailprojects.module').then(
            (m) => m.DetailprojectsModule
          ),
      },
      {
        path: 'specificProject',
        loadChildren: () =>
          import('./views/visitor/specificproject/specificproject.module').then(
            (m) => m.SpecificprojectModule
          ),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./views/visitor/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'offers',
        loadChildren: () =>
          import('./views/visitor/list-offers/list-offers.module').then(
            (m) => m.ListOffersModule
          ),
      },
      {
        path: 'offers-details/:id',
        loadChildren: () =>
          import('./views/visitor/detail-offers/detail-offers.module').then(
            (m) => m.DetailOffersModule
          ),
      },
      {
        path: 'specific-offer',
        loadChildren: () =>
          import('./views/visitor/specific-offer/specific-offer.module').then(
            (m) => m.SpecificOfferModule
          ),
      },
      {
        path: 'add-candidacy',
        loadChildren: () =>
          import('./views/visitor/add-candidacy/add-candidacy.module').then(
            (m) => m.AddCandidacyModule
          ),
      },

      {
        path: 'online',
        loadChildren: () =>
          import('./views/visitor/online/online.module').then(
            (m) => m.OnlineModule
          ),
      },

      { path: 'events', loadChildren: () => import('./views/visitor/events/events.module').then(m => m.EventsModule) },
      { path: 'reports', loadChildren: () => import('./views/visitor/reports/reports.module').then(m => m.ReportsModule) },
      { path: 'paths', loadChildren: () => import('./views/visitor/paths/paths.module').then(m => m.PathsModule) },
      { path: 'notificationList', loadChildren: () => import('./views/visitor/notification/notificationList/notification-list.module').then(m => m.NotificationListModule) },
    ],
  },

  //////////////////////  'student' ////////////////////////
  {
    path: 'student',
    component: StudentLayoutComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/student/student-home/student-home.module').then(
            (m) => m.StudentHomeModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/student/student-profile/student-profile.module').then(
            (m) => m.StudentProfileModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import(
            './views/student/student-calendar/student-calendar.module'
          ).then((m) => m.StudentCalendarModule),
      },
      {
        path: 'chat/:id',
        loadChildren: () =>
          import('./views/student/student-chat/student-chat.module').then(
            (m) => m.StudentChatModule
          ),
      },
      { path: 'chatAll',
      loadChildren: () =>
        import('./views/student/student-chat/student-chat-all/student-chat-all.module').then(
          m => m.StudentChatAllModule)
      },
      { path: 'forum', loadChildren: () =>
         import('./views/student/student-forum/student-forum.module').then(
           m => m.StudentForumModule) },
      {
        path: 'records',
        loadChildren: () =>
          import('./views/student/student-records/student-records.module').then(
            (m) => m.StudentRecordsModule
          ),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import(
            './views/student/student-projects/student-projects.module'
          ).then((m) => m.StudentProjectsModule),
      },
      {
        path: 'FeedBack',
        loadChildren: () =>
          import('./views/student/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      {
        path: 'profile/:id',
        loadChildren: () =>
          import('./views/student/getcertifcates/getcertifcates.module').then(
            (m) => m.GetcertifcatesModule
          ),
      },
      { path: 'forum/:id',
       loadChildren: () =>
        import('./views/student/student-forum/forum-list/forum-list.module').then(
          m => m.ForumListModule)
      },
      { path: 'student-quiz', loadChildren: () =>
        import('./views/student/student-quiz/student-quiz.module').then(
          m => m.StudentQuizModule)
      },
      { path: 'student-quiz-play/:id', loadChildren: () =>
        import('./views/student/student-quiz-play/student-quiz-play.module').then(
        m => m.StudentQuizPlayModule)
      },
      {
        path: 'getcertificats',
        loadChildren: () =>
          import('./views/student/getcertifcates/getcertifcates.module').then(
            (m) => m.GetcertifcatesModule
          ),
      },
    ],
  },

  //////////////////////  'coach' ////////////////////////
  {
    path: 'coach',
    component: CoachLayoutComponent,
    canActivate: [CoachGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/coach/coach-home/coach-home.module').then(
            (m) => m.CoachHomeModule
          ),
      },
      { path: 'forum', loadChildren: () =>
        import('./views/coach/coach-forum/coach-forum.module').then(
           m => m.CoachForumModule)
      },
      { path: 'coach-quiz', loadChildren: () =>
        import('./views/coach/coach-quiz/coach-quiz.module').then(
          m => m.CoachQuizModule)
      },
      { path: 'coach-quiz-form/:id', loadChildren: () =>
        import('./views/coach/coach-quiz-form/coach-quiz-form.module').then(
          m => m.CoachQuizFormModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/coach/coach-profile/coach-profile.module').then(
            (m) => m.CoachProfileModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./views/coach/coach-calendar/coach-calendar.module').then(
            (m) => m.CoachCalendarModule
          ),
      },
      {
        path: 'chat/:id',
        loadChildren: () =>
          import('./views/coach/coach-chat/coach-chat.module').then(
            (m) => m.CoachChatModule
          ),
      },
      { path: 'chatAll',
      loadChildren: () =>
        import('./views/coach/coach-chat/coach-chat-all/coach-chat-all.module').then(
          m => m.CoachChatAllModule) },
      {
        path: 'groups',
        loadChildren: () =>
          import('./views/coach/coach-groups/coach-groups.module').then(
            (m) => m.CoachGroupsModule
          ),
      },
      {
        path: 'projectgroup',
        loadChildren: () =>
          import(
            './views/coach/coach-students-table/coach-students-table.module'
          ).then((m) => m.CoachStudentsTableModule),
      },
      {
        path: 'projectmember',
        loadChildren: () =>
          import(
            './views/coach/project-member/project-member-routing.module'
          ).then((m) => m.ProjectMemberRoutingModule),
      },

      {
        path: 'project-member-details',
        loadChildren: () =>
          import(
            './views/coach/coach-student-projects/coach-student-projects.module'
          ).then((m) => m.CoachStudentProjectsModule),
      },
      {
        path: 'presence/:id',
        loadChildren: () =>
          import('./views/coach/presence/presence.module').then(
            (m) => m.PresenceModule
          ),
      },
      { path: 'forum/:id', loadChildren: () =>
        import('./views/coach/coach-forum/forum-list/forum-list.module').then(
        m => m.ForumListModule) },
    ],
  },

  //////////////////////  'admin' ////////////////////////
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/admin/admin-home/admin-home.module').then(
            (m) => m.AdminHomeModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/admin/admin-profile/admin-profile.module').then(
            (m) => m.AdminProfileModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./views/admin/admin-calendar/admin-calendar.module').then(
            (m) => m.AdminCalendarModule
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./views/admin/admin-groups/admin-groups.module').then(
            (m) => m.AdminGroupsModule
          ),
      },
      {
        path: 'studentlist',
        loadChildren: () =>
          import(
            './views/admin/admin-studentlist/admin-studentlist.module'
          ).then((m) => m.AdminStudentlistModule),
      },
      {
        path: 'coachlist',
        loadChildren: () =>
          import('./views/admin/admin-coachlist/admin-coachlist.module').then(
            (m) => m.AdminCoachlistModule
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./views/admin/admin-feedback/admin-feedback.module').then(
            (m) => m.AdminFeedbackModule
          ),
      },
      {
        path: 'studentlist',
        loadChildren: () =>
          import(
            './views/admin/admin-studentprofile/admin-studentprofile.module'
          ).then((m) => m.AdminStudentprofileModule),
      },
      {
        path: 'coachlist',
        loadChildren: () =>
          import(
            './views/admin/admin-coachprofile/admin-coachprofile.module'
          ).then((m) => m.AdminCoachprofileModule),
      },
      {
        path: 'hackerspace',
        loadChildren: () =>
          import(
            './views/admin/admin-hacherspaces/admin-hacherspaces.module'
          ).then((m) => m.AdminHacherspacesModule),
      },
      {
        path: 'hackerspaceform',
        loadChildren: () =>
          import(
            './views/admin/admin-hackerspaceform/admin-hackerspaceform.module'
          ).then((m) => m.AdminHackerspaceformModule),
      },
      {
        path: 'hackerspaceUpdate/:id',
        loadChildren: () =>
        import(
          './views/admin/admin-hackerspace-update/admin-hackerspaces-update.module'
        ).then((m) => m.AdminHackerspacesUpdateModule),
      },
      {
        path: 'trainings',
        loadChildren: () =>
          import('./views/admin/admin-trainings/admin-trainings.module').then(
            (m) => m.AdminTrainingsModule
          ),
      },
      {
        path: 'trainingsform',
        loadChildren: () =>
          import(
            './views/admin/admin-trainingsform/admin-trainingsform.module'
          ).then((m) => m.AdminTrainingsformModule),
      },
      {
        path: 'trainingsUpdate/:id',
        loadChildren: () =>
          import(
            './views/admin/admin-trainingUpdate/admin-training-update-routing.module'
          ).then((m) => m.AdminTrainingUpdateRoutingModule),
      },
      {
        path: 'chapters',
        loadChildren: () =>
          import(
            './views/admin/admin-trainingschapter/admin-trainingschapter.module'
          ).then((m) => m.AdminTrainingschapterModule),
      },
      {
        path: 'sessionform',
        loadChildren: () =>
          import(
            './views/admin/admin-sessionform/admin-sessionform.module'
          ).then((m) => m.AdminSessionformModule),
      },
      {
        path: 'categorieForm',
        loadChildren: () =>
          import('./views/admin/categorieform/categorieform.module').then(
            (m) => m.CategorieformModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./views/admin/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'projectowner',
        loadChildren: () =>
          import(
            './views/admin/admin-projectowner/admin-projectowner.module'
          ).then((m) => m.AdminProjectownerModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./views/admin/admin-projects/admin-projects.module').then(
            (m) => m.AdminProjectsModule
          ),
      },
      {
        path: 'add-projects',
        loadChildren: () =>
          import(
            './views/admin/admin-addprojects/admin-addprojects.module'
          ).then((m) => m.AdminAddprojectsModule),
      },
      {
        path: 'update-projects/:id',
        loadChildren: () =>
          import(
            './views/admin/admin-updateprojects/admin-updateprojects.module'
          ).then((m) => m.AdminUpdateprojectsModule),
      },
      {
        path: 'add-projectowner',
        loadChildren: () =>
          import(
            './views/admin/admin-addprojectowner/admin-addprojectowner.module'
          ).then((m) => m.AdminAddprojectownerModule),
      },
      {
        path: 'update-projectowner/:id',
        loadChildren: () =>
          import(
            './views/admin/admin-updateprojectowner/admin-updateprojectowner.module'
          ).then((m) => m.AdminUpdateprojectownerModule),
      },
      {
        path: 'projectclients/:id',
        loadChildren: () =>
          import(
            './views/admin/admin-project-client/admin-project-client.module'
          ).then((m) => m.AdminProjectClientModule),
      },

      {
        path: 'projectclients',
        loadChildren: () =>
          import(
            './views/admin/admin-allprojectclients/admin-allprojectclients/admin-allprojectclients.module'
          ).then((m) => m.AdminAllprojectclientsModule),
      },

      {
        path: 'specificproject',
        loadChildren: () =>
          import('./views/admin/specificproject/specificproject.module').then(
            (m) => m.SpecificprojectModule
          ),
      },
      {
        path: 'specificproject/:id',
        loadChildren: () =>
          import(
            './views/admin/specificproject-details/specificproject-details.module'
          ).then((m) => m.SpecificprojectDetailsModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./views/admin/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'add-company',
        loadChildren: () =>
          import('./views/admin/add-company/add-company.module').then(
            (m) => m.AddCompanyModule
          ),
      },

      {
        path: 'add-offer',
        loadChildren: () =>
          import('./views/admin/offers/offers.module').then(
            (m) => m.OffersModule
          ),
      },
      {
        path: 'list-offer',
        loadChildren: () =>
          import('./views/admin/list-offers/list-offers.module').then(
            (m) => m.ListOffersModule
          ),
      },
      {
        path: 'update-offer/:id',
        loadChildren: () =>
          import('./views/admin/update-offers/update-offers.module').then(
            (m) => m.UpdateOffersModule
          ),
      },
      {
        path: 'update-company/:id',
        loadChildren: () =>
          import('./views/admin/update-company/update-company.module').then(
            (m) => m.UpdateCompanyModule
          ),
      },
      {
        path: 'all-specific-offer',
        loadChildren: () =>
          import(
            './views/admin/all-specific-offer/all-specific-offer.module'
          ).then((m) => m.AllSpecificOfferModule),
      },
      {
        path: 'detail-specific-offer/:id',
        loadChildren: () =>
          import(
            './views/admin/details-specific-offer/details-specific-offer.module'
          ).then((m) => m.DetailsSpecificOfferModule),
      },
      {
        path: 'candidacy',
        loadChildren: () =>
          import('./views/admin/candidacy/candidacy.module').then(
            (m) => m.CandidacyModule
          ),
      },
      {
        path: 'detail-candidacy/:id',
        loadChildren: () =>
          import('./views/admin/detail-candidacy/detail-candidacy.module').then(
            (m) => m.DetailCandidacyModule
          ),
      },
      {
        path: 'detail-offer/:id',
        loadChildren: () =>
          import('./views/admin/detail-offer/detail-offer.module').then(
            (m) => m.DetailOfferModule
          ),
      },
      {
        path: 'certificate',
        loadChildren: () =>
          import('./views/admin/generate-certif/generate-certif.module').then(
            (m) => m.GenerateCertifModule
          ),
      },
      {
        path: 'offerclient/:id',
        loadChildren: () =>
          import('./views/admin/offerclient/offerclient.module').then(
            (m) => m.OfferclientModule
          ),
      },
      {
        path: 'offerclient-detail/:id',
        loadChildren: () =>
          import(
            './views/admin/offerclient-detail/offerclient-detail.module'
          ).then((m) => m.OfferclientDetailModule),
      },
      { path: 'admin-chatbot', loadChildren: () =>
        import('./views/admin/admin-chatbot/admin-chatbot.module').then(
          (m) => m.AdminChatbotModule
        ),
      },
      { path: 'events', loadChildren: () => import('./views/admin/admin-events/admin-events.module').then(m => m.AdminEventsModule) },
      { path: 'eventsForm', loadChildren: () => import('./views/admin/event-form/event-form.module').then(m => m.EventFormModule) },
      { path: 'updateEvent/:id', loadChildren: () => import('./views/admin/event-update-form/event-update-form.module').then(m => m.EventUpdateFormModule) },
      { path: 'courses', loadChildren: () => import('./views/admin/admin-courses/admin-courses.module').then(m => m.AdminCoursesModule) },
      { path: 'chaptersE', loadChildren: () => import('./views/admin/admin-e-learning-chapters/admin-e-learning-chapters.module').then(m => m.AdminELearningChaptersModule) },
      { path: 'lessons', loadChildren: () => import('./views/admin/admin-lessons/admin-lessons.module').then(m => m.AdminLessonsModule) },
      { path: 'reports', loadChildren: () => import('./views/admin/admin-reports/admin-reports.module').then(m => m.AdminReportsModule) },
      { path: 'paths', loadChildren: () => import('./views/admin/admin-paths/admin-paths.module').then(m => m.AdminPathsModule) },
      { path: 'demands', loadChildren: () => import('./views/admin/admin-demands/admin-demands.module').then(m => m.AdminDemandsModule) },
      { path: 'requests', loadChildren: () => import('./views/admin/admin-requests/admin-requests.module').then(m => m.AdminRequestsModule) },
      { path: 'messages', loadChildren: () => import('./views/admin/admin-messages/admin-messages.module').then(m => m.AdminMessagesModule) },
      { path: 'account-management', loadChildren: () => import('./views/admin/admin-create-account/admin-create-account.module').then(m => m.AdminCreateAccountModule) },
    ],
  },
  { path: 'admin-trainingUpdate', loadChildren: () => import('./views/admin/admin-trainingUpdate/admin-training-update.module').then(m => m.AdminTrainingUpdateModule) },
  { path: 'notification', loadChildren: () => import('./views/visitor/notification/notification.module').then(m => m.NotificationModule) },
  { path: 'navbar', loadChildren: () => import('./views/visitor/nav-bar/nav-bar.module').then(m => m.NavBarModule) },
  { path: 'oauth2/redirect', loadChildren: () => import('./views/visitor/oauth2-redirect/oauth2-redirect.module').then(m => m.OAuth2RedirectModule) },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading, scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
