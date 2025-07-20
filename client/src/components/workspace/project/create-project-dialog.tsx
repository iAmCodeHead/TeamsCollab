import { Dialog, DialogContent, DialogTitle, VisuallyHide } from "@/components/ui/dialog";
import CreateProjectForm from "@/components/workspace/project/create-project-form";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";

const CreateProjectDialog = () => {
  const { open, onClose } = useCreateProjectDialog();
  return (
    <div>
      <Dialog modal={true} open={open} onOpenChange={onClose}>
        <DialogContent aria-describedby={undefined} className="sm:max-w-lg border-0">
          <VisuallyHide>
            <DialogTitle>New Project</DialogTitle>
          </VisuallyHide>
          <CreateProjectForm {...{ onClose }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProjectDialog;
