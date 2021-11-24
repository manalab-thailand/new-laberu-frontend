import { MutationTree } from "vuex";
import { IUser } from "../module-users/state";
import { IAuthState } from "./state";

const mutation: MutationTree<IAuthState> = {
  onUserLogin(state, payload) {
    const { user, authentication } = payload;
    state.user = user;
    state.authentication = authentication;
  },

  onUserNotRegistered(state, payload: { uid: string; email: string }) {
    state.user.uid = payload.uid;
    state.user.email = payload.email;
  },

  onUpdateUser(state, payload: IUser) {
    state.user.firstname = payload.firstname;
    state.user.lastname = payload.lastname;
    state.user.email = payload.email;
    state.user.phone_number = payload.phone_number;
    state.user.career = payload.career;
    state.user.province = payload.province;
    state.user.payment = payload.payment;
  },
};

export default mutation;
