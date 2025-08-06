import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadBanner } from '@/integrations/supabase/hero';
import { toast } from '@/hooks/use-toast';
import { safelyCompareStrings } from '@/lib/utils';

interface HeroBannerUploadDialogProps {
  onBannerUploaded?: () => void;
}

const HeroBannerUploadDialog = ({ onBannerUploaded }: HeroBannerUploadDialogProps) => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [position, setPosition] = useState<number>(1);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "storage-success" | "storage-error">("idle");
  const [dbStatus, setDbStatus] = useState<"idle" | "db-success" | "db-error">("idle");
  const [altText, setAltText] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl(null);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(e.target.value));
  };

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please select an image to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setStatus("idle");
    setDbStatus("idle");

    try {
      const storageResult = await uploadBanner(imageFile);

      if (storageResult?.data?.path) {
        setStatus("storage-success");
        toast({
          title: "Success",
          description: "Image uploaded to storage successfully!",
        });

        try {
          const dbResult = await fetch('/api/admin/hero', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: storageResult.data.path,
              position: position,
              alt: altText,
            }),
          });

          if (dbResult.ok) {
            setDbStatus("db-success");
            toast({
              title: "Success",
              description: "Banner details saved to database successfully!",
            });
            onBannerUploaded?.();
          } else {
            setDbStatus("db-error");
            toast({
              title: "Database Error",
              description: "Failed to save banner details to database.",
              variant: "destructive",
            });
          }
        } catch (error) {
          setDbStatus("db-error");
          toast({
            title: "Database Error",
            description: "Failed to save banner details to database.",
            variant: "destructive",
          });
        }
      } else {
        setStatus("storage-error");
        toast({
          title: "Storage Error",
          description: "Failed to upload image to storage.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setStatus("storage-error");
      toast({
        title: "Upload Error",
        description: "An error occurred during the upload process.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New Hero Banner</DialogTitle>
          <DialogDescription>
            Upload a new image to be used as a hero banner.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="col-span-3"
              accept="image/*"
            />
          </div>
          {imageUrl && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preview" className="text-right">
                Preview
              </Label>
              <div className="col-span-3 relative">
                <img
                  src={imageUrl}
                  alt="Image Preview"
                  className="w-full rounded-md"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">
              Position
            </Label>
            <Input
              type="number"
              id="position"
              defaultValue={position}
              onChange={handlePositionChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="altText" className="text-right">
              Alt Text
            </Label>
            <Input
              type="text"
              id="altText"
              value={altText}
              onChange={handleAltTextChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                Uploading...
                <Upload className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Upload Banner"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeroBannerUploadDialog;
