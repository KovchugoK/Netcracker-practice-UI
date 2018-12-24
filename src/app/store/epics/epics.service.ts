import {StartupEpic} from './startup.epic';
import {Injectable} from '@angular/core';
import {combineEpics} from 'redux-observable';
import {CurrentUserEpic} from './current-user.epic';
import {ResumeEpic} from './resume.epic';
import {ContactsEpic} from './contacts.epic';
import {AccountEpic} from './account.epic';
import {ConversationsEpic} from './conversations.epic';
import {FavoriteEpic} from './favorite.epic';
import {ResetPasswordEpic} from './reset-password.epic'

@Injectable()
export class EpicService {

  constructor(private startupEpic: StartupEpic,
              private resumeEpic: ResumeEpic,
              private currentUserEpic: CurrentUserEpic,
              private contactsEpic: ContactsEpic,
              private  accountEpic: AccountEpic,
              private favoriteEpic: FavoriteEpic,
              private conversationsEpic: ConversationsEpic,
              private resetPasswordEpic: ResetPasswordEpic) {
  }

  getEpics() {
    return combineEpics(
      this.startupEpic.fetchStartups$,
      this.startupEpic.createStartup$,
      this.startupEpic.updateStartup$,
      this.startupEpic.deleteStartup$,
      this.startupEpic.selectStartup$,
      this.startupEpic.searchStartups$,
      this.currentUserEpic.loginUser$,
      this.currentUserEpic.logout$,
      this.resumeEpic.fetchResumes$,
      this.resumeEpic.selectResume$,
      this.resumeEpic.createResume$,
      this.resumeEpic.deleteResume$,
      this.resumeEpic.updateResume$,
      this.resumeEpic.fetchResumesSpecialists$,
      this.resumeEpic.fetchResumesInvestors$,
      this.resumeEpic.searchResumes$,
      this.resumeEpic.updateResume$,
      this.contactsEpic.fetchContacts$,
      this.contactsEpic.deleteContact$,
      this.favoriteEpic.deleteFavorite$,
      this.favoriteEpic.fetchFavorites$,
      this.contactsEpic.addContact$,
      this.conversationsEpic.fetchConversations$,
      this.conversationsEpic.getConversation$,
      this.contactsEpic.deleteContact$,
      this.accountEpic.updateAccount$,
      this.accountEpic.selectAccount$,
      this.accountEpic.deleteAccount$,
      this.resetPasswordEpic.sendEmail$,
    );
  }
}
