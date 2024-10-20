import * as galleriesSagas from "./galleries/saga";
import * as authSagas from "./auth/saga";
const sagas = {
    ...galleriesSagas,
    ...authSagas,
};

export default sagas;