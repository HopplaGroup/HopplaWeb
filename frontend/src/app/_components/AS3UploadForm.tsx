"use client";
import { cn } from "@/lib/utils/cn";
import { LoaderCircle, Pen } from "lucide-react";
import React, { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import * as m from "@/paraglide/messages";
import Cropper from "react-easy-crop";
import { Button } from "../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const UploadForm = ({
    make,
    defaultUrl,
    className,
    onSuccessfulUpload,
    folderName,
    cropSize = { width: 200, height: 200 },
}: {
    make?: (url: string) => Promise<void>;
    defaultUrl?: string;
    className?: string;
    onSuccessfulUpload?: (url: string) => void;
    folderName?: string;
    cropSize?: { width: number; height: number };
}) => {
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(
        !!defaultUrl ? defaultUrl : "/assets/upload-img.png"
    );
    const [anotherImageUrl, setAnotherImageUrl] = useState<string>("");
    // when successful message its deleayed somohe and
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback(
        (croppedArea: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (uploading) return;
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 25 * 1024 * 1024) {
            toast.error(m.lazy_merry_ibex_shine());
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setAnotherImageUrl(event.target?.result as string);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
    };

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: any
    ): Promise<Blob> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return Promise.reject(new Error("Could not get canvas context"));
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
            }, "image/jpeg");
        });
    };

    const handleUpload = async () => {
        if (!croppedAreaPixels) return;

        setUploading(true);
        const toastId = toast.loading(m.only_dry_frog_belong());
        const prevImageUrl = imageUrl;
        try {
            const croppedImageBlob = await getCroppedImg(
                anotherImageUrl,
                croppedAreaPixels
            );
            const formData = new FormData();
            formData.append("file", croppedImageBlob, "cropped_image.jpg");
            if (folderName) formData.append("category", folderName);
            const newImage = URL.createObjectURL(croppedImageBlob);
            setImageUrl(newImage);
            const response = await fetch("/api/s3-upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                await make?.(data.fileUrl);
                toast.success(m.mushy_loose_barbel_intend(), { id: toastId });
                onSuccessfulUpload?.(data.fileUrl);
                setShowCropper(false);
            } else {
                if (data.error === "RATE_LIMIT") {
                    toast.error(m.stout_tidy_okapi_type(), { id: toastId });
                    setImageUrl(prevImageUrl);
                } else {
                    throw new Error("Failed to upload image");
                }
            }
        } catch (error) {
            setImageUrl(prevImageUrl);
            toast.error(m.away_livid_cowfish_empower(), { id: toastId });
        } finally {
            inputRef.current!.value = "";
            setUploading(false);
        }
    };

    return (
        <>
            {/* when cancel photo remains */}
            <Dialog open={showCropper}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            {m.pink_each_reindeer_twist()}
                        </DialogTitle>
                        <div className="relative">
                            <div className="h-[300px] rounded-lg overflow-hidden mt-2">
                                <Cropper
                                    image={anotherImageUrl}
                                    crop={crop}
                                    zoom={zoom}
                                    cropShape="rect"
                                    cropSize={cropSize}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button
                            onClick={() => {
                                setShowCropper(false);
                            }}
                            variant="ghost"
                        >
                            {m.large_tired_grizzly_mop()}
                        </Button>
                        <Button
                            className=""
                            onClick={() => {
                                setShowCropper(false);
                                handleUpload();
                            }}
                        >
                            {m.equal_gray_shell_kiss()}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* {showCropper && (
        <div className="fixed inset-0 bg-black/40 z-[99999]">
      
        </div>
      )} */}
            <div
                className={cn(
                    "w-[200px] h-[200px] border group cursor-pointer rounded-lg overflow-hidden relative",
                    className,
                    {
                        "cursor-default": uploading,
                    }
                )}
                onClick={() => !showCropper && inputRef.current?.click()}
            >
                <>
                    <img
                        alt="upload"
                        className="size-6 w-full h-full object-cover group-hover:opacity-80"
                        src={imageUrl}
                    />
                    {!uploading && (
                        <div className="absolute inset-0 hidden items-center justify-center text-white bg-black bg-opacity-50 group-hover:flex">
                            <span>
                                <Pen size={24} />
                            </span>
                        </div>
                    )}
                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
                            <span className="animate-spin">
                                <LoaderCircle size={24} />
                            </span>
                        </div>
                    )}
                </>
            </div>
            <input
                disabled={uploading}
                ref={inputRef}
                className="hidden"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
            />
            {showCropper && (
                <div className="mt-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading
                            ? m.basic_teary_ape_inspire()
                            : m.aloof_safe_hamster_zip()}
                    </button>
                </div>
            )}
        </>
    );
};
