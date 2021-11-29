import { store } from "quasar/wrappers";
import { InjectionKey } from "vue";
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from "vuex";

import createPersistedState from "vuex-persistedstate";

import moduleAuth from "./module-auth";
import moduleUsers from "./module-users";
import moduleProjects from "./module-project";
import moduleTaskSuccess from "./module-task-success";
import moduleTaskImage from "./module-task-image";

import { IAuthState } from "./module-auth/state";
import { IProjectState } from "./module-project/state";
import { ITaskSuccessState } from "./module-task-success/state";
import { IUserState } from "./module-users/state";
import { ITaskImageState } from "./module-task-image/state";

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  moduleUsers: IUserState;
  moduleAuth: IAuthState;
  moduleProjects: IProjectState;
  moduleTaskSuccess: ITaskSuccessState;
  moduleTaskImage: ITaskImageState;
}

// provide typings for `this.$store`
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol("vuex-key");

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      moduleAuth,
      moduleUsers,
      moduleProjects,
      moduleTaskSuccess,
      moduleTaskImage,
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
    plugins: [createPersistedState()],
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
