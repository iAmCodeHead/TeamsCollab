import WorkspaceForm from "./create-workspace-form";
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog";
import { Dialog, DialogContent, DialogTitle, VisuallyHide } from "@/components/ui/dialog";
const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-5xl !p-0 overflow-hidden border-0">
        <VisuallyHide>
          <DialogTitle>New Workspace</DialogTitle>
        </VisuallyHide>
        <WorkspaceForm {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
