import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

/**
 *
 * @param file uploaded file (e.target.files[0])
 * @returns returns image url
 */
export const uploadImageToFIrebase = async (file) => {
    try {
        if (!file) throw new Error("file cannot be empty");
        const storageRef = ref(
            storage,
            `user-management-app-images/${file.name}`
        );
        await uploadBytes(storageRef, file);

        // Get the download URL
        const imageUrl = await getDownloadURL(storageRef);

        return imageUrl;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};
