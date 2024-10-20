import HttpService from "./HttpService";

class GalleryService extends HttpService {
    getAll = async (page = null) => {
        if (page) {
            const { data } = await this.client.get(`/galleries?page=${page}`);
            return data;
        }

        const { data } = await this.client.get('/galleries');
        return data;
    }
    get = async (id, page = null) => {
        if (page) {
            const { data } = await this.client.get(`/user-galleries/${id}?page=${page}`);
            return data;
        }

        const { data } = await this.client.get(`user-galleries/${id}`);
        return data;
    };
    getAuthorGallery = async (id) => {
        const { data } = await this.client.get(`galleries/${id}`);
        return data;
    }
    add = async (newGallery) => {
        const { data } = await this.client.post("galleries", newGallery);
        return data;
    };

    delete = async (galleryId) => {
        console.log("delete in service id ", galleryId);
        const { data } = await this.client.delete(`galleries-delete/${galleryId}`);
        console.log("data from delete", data);
        return data;
    };
    edit = async (id, newGallery) => {
        const { data } = await this.client.put(`galleries/${id}`, newGallery);
        return data;
    };
    getSliderGallery = async () => {
        const { data } = await this.client.get('galleries-slider');
        return data;
    }
}

const galleryService = new GalleryService();
export default galleryService;
