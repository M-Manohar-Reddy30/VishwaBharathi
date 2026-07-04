import api from "@/lib/api";

import { ENDPOINTS } from "@/constants/endpoints";

import type { ApiResponse } from "@/types/api.types";
import type { UploadedImage } from "../types/upload.types";

export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("image", file);

  const response =
    await api.post<ApiResponse<UploadedImage>>(
      ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

  return response.data.data;
}