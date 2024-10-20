import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries() { },
    getGallery() { },
    getAuthorGallery() { },
    addGallery() { },
    editGallery() { },
    deleteGallery() { },
    addComment() { },
    deleteComment() { },
    getComments() { },

};

const galleriesSlice = createSlice({
    name: "galleries",
    initialState: {
        page: {
            data: [],
            current_page: 0,
            last_page: 0,
            total: 0,
        },
        gallery: {
            gallery: null,
            comments: {
                data: [],
                current_page: 0,
                last_page: 0,
                total: 0
            }
        },
        authorGallery: null,
        galleryErrors: null,
        successfullyCreatedGallery: "",


    },

    reducers: {
        setGalleries(state, { payload }) {
            state.page = payload;
        },
        setGallery(state, { payload }) {
            state.gallery = payload;
        },
        setAuthorGallery(state, { payload }) {
            state.authorGallery = payload;
        },
        deleteGallerySuccess(state, { payload }) {

            if (state.page.data) {
                state.page.data = state.page.data.filter((gallery) => gallery.id !== payload);
            }
        },

        appendGalleries(state, { payload }) {
            state.page = {
                ...payload,
                data: payload.data.concat(state.page.data),
            };
        },
        appendComments(state, { payload }) {
            state.gallery.comments = {
                ...payload,
                data: payload.data.concat(state.gallery.comments.data)
            };
        },
        setComments(state, { payload }) {
            state.gallery.comments = payload;
        },
        addCommentSuccess(state, { payload }) {

            if (state.gallery.gallery) {
                state.gallery.comments.data = [
                    ...state.gallery.comments.data,
                    payload.comments[payload.comments.length - 1],

                ];
            }
        },
        deleteCommentSuccess(state, { payload }) {
            if (state.gallery.gallery) {
                state.gallery.comments.data = state.gallery.comments.data.filter(
                    (comment) => comment.id !== payload
                );


            }
        },
        setGalleryErrors(state, { payload }) {
            state.galleryErrors = payload;
        },
        setSuccessfullyCreatedGallery: (state, { payload }) => {
            state.successfullyCreatedGallery = payload;
        },


        ...middlewareActions,
    },
});

export const {
    getGalleries,
    setGalleries,
    getGallery,
    setGallery,
    getAuthorGallery,
    setAuthorGallery,
    addGallery,
    editGallery,
    deleteGallery,
    deleteGallerySuccess,
    appendGalleries,
    addComment,
    deleteComment,
    deleteCommentSuccess,
    getComments,
    setComments,
    addCommentSuccess,
    appendComments,
    setGalleryErrors,
    setSuccessfullyCreatedGallery,


} = galleriesSlice.actions;

export default galleriesSlice.reducer;

