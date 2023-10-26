import CategoryStore from "@/store/CategoryStore";
import AuthStore from './AuthStore';

interface RootStore {
    authStore: AuthStore;
    categoryStore: CategoryStore;
}

class RootStore {
    authStore: AuthStore;
    categoryStore: CategoryStore;

    constructor() {
        this.authStore = new AuthStore();
        this.categoryStore = new CategoryStore(this);
    }
}

export default RootStore