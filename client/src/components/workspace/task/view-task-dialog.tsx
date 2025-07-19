import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TaskType } from '@/types/api.type';

const ViewTaskDialog = ({ task, isOpen, onClose }: { task: TaskType; isOpen: boolean; onClose: () => void }) => {
    const { title, description } = task;
  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0 space-y-3">
        <div className="w-full h-auto max-w-full">
            <div className="h-full">
                <div className="mb-5 pb-2 border-b">
                    <h1 className="text-xl font-semibold text-center sm:text-left">{title}</h1>
                </div>
            </div>
        </div>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {task && <p>{task.description}</p>}
      </DialogContent>
    </Dialog>
  );
}

export default ViewTaskDialog