import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IUser, IUserState } from "./state";

const actions: ActionTree<IUserState, StateInterface> = {};

export default actions;
