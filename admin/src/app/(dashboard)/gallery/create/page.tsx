import { PageHeader } from "@/components/admin";

import GalleryForm from "@/features/gallery/components/GalleryForm";

export default function CreateGalleryPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        title="Add Gallery Image"
        description="Create a new gallery image."
      />

      <GalleryForm
        mode="create"
      />

    </div>
  );
}