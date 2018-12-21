import {Startup} from './Startup';
import {Resume} from './Resume';

export class StartupResume {
  id: string;
  accepted: boolean;
  startupName: string;
  // startupId: string;
  resume: Resume;
  startup: Startup;
}
