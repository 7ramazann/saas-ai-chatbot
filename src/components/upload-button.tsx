import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

type UploadButtonProps = {
    onUpload: (url: string) => void;
    className?: string;
};

const UploadButton = ({ onUpload, className }: UploadButtonProps) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        // Simulate file upload (replace this with your actual upload logic)
        const formData = new FormData();
        formData.append("file", file);

        try {
            // Replace this with your API endpoint for file uploads
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.url) {
                onUpload(data.url); // Pass the uploaded file URL to the parent component
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={className}>
            <input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
            />
            <label htmlFor="upload">
                <Button variant="outline" asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <UploadCloud size={16} />
                        <span>{isUploading ? "Uploading..." : "Upload Icon"}</span>
                    </div>
                </Button>
            </label>
        </div>
    );
};

export default UploadButton;