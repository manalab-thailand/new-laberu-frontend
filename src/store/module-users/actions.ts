import { ExecException } from "child_process";
import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IPayment, IUser, IUserState, UserRole, UserStatus } from "./state";

const actions: ActionTree<IUserState, StateInterface> = {};

export default actions;
