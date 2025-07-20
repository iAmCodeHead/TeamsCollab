import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, VisuallyHide } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateTaskForm from "./create-task-form";

const CreateTaskDialog = (props: { projectId?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            New Task
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className="sm:max-w-lg max-h-auto my-5 border-0">
          <VisuallyHide>
            <DialogTitle>New Task</DialogTitle>
          </VisuallyHide>
          <CreateTaskForm projectId={props.projectId} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
