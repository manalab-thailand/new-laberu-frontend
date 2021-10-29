import { MutationTree } from "vuex";
import { IAuthState } from "./state";

const mutation: MutationTree<IAuthState> = {
  onUserLogin(state, payload) {
    const { user, authentication } = payload;
    state.user = user;
    state.authentication = authentication;
  },
};

export default mutation;
