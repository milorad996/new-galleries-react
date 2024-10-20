export function selectGalleries(state) {
    return state.galleries.page;
}

export function selectGallery(state) {
    return state.galleries.gallery;
}
export function selectAuthorGallery(state) {
    return state.galleries.authorGallery;
}
export function selectGalleryErrors(state) {
    return state.galleries.galleryErrors;
}
export function selectSuccessfullyCreatedGallery(state) {
    return state.galleries.successfullyCreatedGallery;
}
