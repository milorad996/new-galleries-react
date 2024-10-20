import { takeLatest, call, put } from "redux-saga/effects";
import galleryService from "../../services/GalleryService";

import {
    getGalleries,
    setGalleries,
    getGallery,
    getAuthorGallery,
    setGallery,
    setAuthorGallery,
    addGallery,
    editGallery,
    deleteGallery,
    deleteGallerySuccess,
    appendGalleries,
    getComments,
    setComments,
    addComment,
    addCommentSuccess,
    deleteCommentSuccess,
    deleteComment,
    appendComments,
    setGalleryErrors,
    setSuccessfullyCreatedGallery,


} from "./slice";
import commentService from "../../services/CommentService";



function* getGalleriesHandler({ payload }) {
    try {
        const galleries = yield call(galleryService.getAll, payload?.page);

        if (payload?.page > 1) {
            yield put(appendGalleries(galleries));
        } else {
            yield put(setGalleries(galleries));
        }

    } catch (e) {
        console.log(e);
    }
}
function* getGalleryHandler({ payload }) {
    try {
        const gallery = yield call(galleryService.get, payload?.id, payload?.page);
        if (payload?.page > 1) {
            yield put(appendComments(gallery?.comments));
        } else {
            yield put(setGallery(gallery));
        }
    } catch (e) {
        console.log(e);
    }
}
function* getAuthorGalleryHandler({ payload }) {


    try {
        const author_galleries = yield call(galleryService.getAuthorGallery, payload.id);
        yield put(setAuthorGallery(author_galleries));
    } catch (e) {
        console.log(e);
    }
    // if (payload.meta?.onSuccess?.name === "handleActionSuccessAdd") {
    //     yield call(payload.meta.onSuccess);
    // }
}
function* addGalleryHandler({ payload }) {

    try {
        const data = yield call(galleryService.add, payload.gallery);
        console.log("data add gallery", data);
        yield put(setSuccessfullyCreatedGallery(data?.message));

    } catch (e) {
        if (e.response?.status === 422) {
            yield put(setGalleryErrors(e?.response?.data?.errors));
        } else {
            alert("Gallery creation failed");
        }
    }
}
function* updateGalleryHandler({ payload }) {

    try {
        yield call(galleryService.edit, payload.id, payload.gallery);
        if (typeof payload.meta?.onSuccess === "function") {
            yield call(payload.meta.onSuccess);
        }
    } catch (e) {
        if (e.response?.status === 422) {
            yield put(setGalleryErrors(e.response.data.errors));
        } else {
            alert("Registration failed");
        }
    }
}
function* deleteGalleryHandler({ payload }) {
    console.log("payloay delete gallery handler", payload);
    try {
        yield call(galleryService.delete, payload?.galleryId);
        yield put(deleteGallerySuccess(payload?.galleryId));
        if (typeof payload?.meta?.onSuccess === "function") {
            yield call(payload?.meta?.onSuccess);
        }
    } catch (e) {
        console.log(e);
    }
}

function* getCommentsHandler({ payload }) {

    try {
        const comments = yield call(commentService.getComments, payload?.galleryId);
        yield put(setComments(comments));
    } catch (e) {
        console.log(e);
    }
}
function* addCommentHandler({ payload }) {
    try {
        const newComment = yield call(commentService.add, payload?.galleryId, payload?.newComment);

        yield put(addCommentSuccess(newComment));
    } catch (e) {
        console.log(e);
    }
}
function* deleteCommentHandler({ payload }) {
    try {
        yield call(commentService.delete, payload);
        yield put(deleteCommentSuccess(payload));
    } catch (e) {
        console.log(e);
    }
}





export function* watchGetGalleries() {
    yield takeLatest(getGalleries.type, getGalleriesHandler);
}
export function* watchGetGalleryHandler() {
    yield takeLatest(getGallery.type, getGalleryHandler);
}
export function* watchGetAuthorGalleryHandler() {
    yield takeLatest(getAuthorGallery.type, getAuthorGalleryHandler);
}
export function* watchAddGalleryHandler() {
    yield takeLatest(addGallery.type, addGalleryHandler);
}
export function* watchUpdateGalleryHandler() {
    yield takeLatest(editGallery.type, updateGalleryHandler);
}
export function* watchDeleteGalleryHandler() {
    yield takeLatest(deleteGallery.type, deleteGalleryHandler);
}
export function* watchGetCommentsHandler() {
    yield takeLatest(getComments.type, getCommentsHandler);
}
export function* watchAddCommentHandler() {
    yield takeLatest(addComment.type, addCommentHandler);
}
export function* watchDeleteCommentHandler() {
    yield takeLatest(deleteComment.type, deleteCommentHandler);
}
