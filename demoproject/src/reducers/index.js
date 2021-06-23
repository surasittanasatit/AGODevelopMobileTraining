import { ConfigReducer } from "./ConfigReducer";
import { ModelReducer } from './ModelReducer';
import { UserReducer } from './UserReducer';

export default (MyCombineReducers = {
  config: ConfigReducer,
  model: ModelReducer,
  user: UserReducer,
});
