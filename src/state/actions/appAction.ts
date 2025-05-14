import { ClockEntryAction } from "./clockEntryActions";
import { JobAction } from "./jobActions";

export type AppAction = JobAction | ClockEntryAction;
