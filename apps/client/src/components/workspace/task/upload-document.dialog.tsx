import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, VisuallyHide } from '@/components/ui/dialog'
import PRDTaskModal from '@/page/workspace/TasksGenerator'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export const DocumentUploadDialog = () => {
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
            AI Task
            </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className="sm:max-w-lg max-h-auto my-5 border-0">
            <VisuallyHide>
            <DialogTitle>AI Task</DialogTitle>
            </VisuallyHide>
            <PRDTaskModal isOpen={isOpen} onClose={onClose} />
        </DialogContent>
        </Dialog>
    </div>
  )
}
