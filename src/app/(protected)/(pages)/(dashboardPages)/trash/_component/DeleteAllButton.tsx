"use client";
import { deleteAllProjects } from "@/actions/projects";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  Projects: Project[];
};

const DeleteAllButton = ({ Projects }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleDeleteAllProjects = async () => {
    setLoading(true);

    if (!Projects || Projects.length === 0) {
      setLoading(false);
      toast.error("Error", {
        description: "No projects Found",
      });
    }
    try {
      const res = await deleteAllProjects(
        Projects.map((project) => project.id)
      );
      if (res?.status !== 200) {
        throw new Error("Failed to delete projects");
      }
      router.refresh();
      setOpen(false);
      //   setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to delete projects",
      });
      setLoading(false);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <AlertDialogBox
      description="This action cannot be undone. This will permanently delete all your projects and remove your data from our servers"
      className=" bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button
        size={"lg"}
        className=" bg-background-80 rounded-lg dark:hover:bg-background-90 text-primary font-semibold hover:text-white"
      >
        <Trash>Delete All</Trash>
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;
