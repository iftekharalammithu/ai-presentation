import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import React from "react";

interface AlertDialogBoxProps {
  children?: React.ReactNode;
  className?: string;
  description?: string;
  loading?: boolean;
  onClick?: () => void;
  open?: boolean;
  handleOpen?: (open: boolean) => void;
}

const AlertDialogBox = ({
  children,
  className,
  description,
  loading,
  onClick,
  open,
  handleOpen,
}: AlertDialogBoxProps) => {
  return (
    <AlertDialog open={open} onCancel={handleOpen}>
      <AlertDialogTrigger asChild={children}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant={"destructive"}
              className={`${className}`}
              onClick={onClick}
            >
              {loading ? (
                <Loader2 className=" animate-spin">Loading</Loader2>
              ) : (
                "Continue"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogTrigger>
    </AlertDialog>
  );
};

export default AlertDialogBox;
