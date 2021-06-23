import { ModelReducer } from './ModelReducer';
import { UserReducer } from './UserReducer';

export default (MyCombineReducers = {
  model: ModelReducer,
  user: UserReducer,
});
