import { AppState } from "../../types";
import { AppAction } from "../actions/appAction";

import * as clockEntryReducers from "./clockEntryReducer";
import * as jobReducers from "./jobReducer";

type AppReducer = (state: AppState, action: AppAction) => AppState;

function toPascalCase(str: string) {
  return str
    .toLowerCase()
    .replace(/(?:^|_)([a-z])/g, (_, char) => char.toUpperCase());
}

const reducers = { ...clockEntryReducers, ...jobReducers };

// Root reducer that delegates to specialized reducers
export const appReducer: AppReducer = (state, action) => {
  const handlerName =
    `handle${toPascalCase(action.type)}` as keyof typeof reducers;

  const handler = reducers[handlerName] as AppReducer | undefined;
  if (handler) return handler(state, action);

  throw new Error("This action does not have an associated handler/reducer.");
};
