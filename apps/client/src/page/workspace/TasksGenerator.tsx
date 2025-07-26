import  { useState, ChangeEvent, DragEvent } from 'react';
import { Upload, FileText, User, CheckCircle, Clock, AlertCircle, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Types
interface WorkspaceMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedHours: number;
  category: string;
  assignedTo: number | null;
  status: 'unassigned' | 'assigned';
}

type ModalStep = 'upload' | 'generate' | 'assign';

// Mock workspace members
const workspaceMembers: WorkspaceMember[] = [
  { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: 'AJ' },
  { id: 2, name: 'Bob Smith', role: 'Backend Developer', avatar: 'BS' },
  { id: 3, name: 'Carol Davis', role: 'Designer', avatar: 'CD' },
  { id: 4, name: 'David Wilson', role: 'Product Manager', avatar: 'DW' },
  { id: 5, name: 'Eva Brown', role: 'QA Engineer', avatar: 'EB' }
];

// Mock task generation based on PRD content
const generateTasksFromPRD = (fileName: string): Task[] => {
  const baseTasks: Omit<Task, 'assignedTo' | 'status'>[] = [
    {
      id: 1,
      title: 'Design user authentication flow',
      description: 'Create wireframes and mockups for login/signup process',
      priority: 'High',
      estimatedHours: 8,
      category: 'Design'
    },
    {
      id: 2,
      title: 'Implement user registration API',
      description: 'Develop backend endpoints for user registration and validation',
      priority: 'High',
      estimatedHours: 12,
      category: 'Backend'
    },
    {
      id: 3,
      title: 'Build responsive dashboard layout',
      description: 'Create the main dashboard interface with navigation',
      priority: 'Medium',
      estimatedHours: 16,
      category: 'Frontend'
    },
    {
      id: 4,
      title: 'Set up database schema',
      description: 'Design and implement database tables for user data',
      priority: 'High',
      estimatedHours: 6,
      category: 'Backend'
    },
    {
      id: 5,
      title: 'Write integration tests',
      description: 'Create comprehensive test suite for new features',
      priority: 'Medium',
      estimatedHours: 10,
      category: 'QA'
    }
  ];

  return baseTasks.map(task => ({
    ...task,
    assignedTo: null,
    status: 'unassigned' as const
  }));
};

const PRDTaskModal = (props: { isOpen: boolean, onClose: () => void }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<ModalStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedTasks, setGeneratedTasks] = useState<Task[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const generateTasks = async (): Promise<void> => {
    if (!uploadedFile) return;
    
    setIsGenerating(true);
    setCurrentStep('generate');
    
    // Simulate API call for task generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const tasks = generateTasksFromPRD(uploadedFile.name);
    setGeneratedTasks(tasks);
    setIsGenerating(false);
    setCurrentStep('assign');
  };

  const assignTask = (taskId: number, memberId: number): void => {
    setGeneratedTasks(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, assignedTo: memberId, status: 'assigned' as const }
          : task
      )
    );
  };

  const unassignTask = (taskId: number): void => {
    setGeneratedTasks(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, assignedTo: null, status: 'unassigned' as const }
          : task
      )
    );
  };

  const handleFinish = (): void => {
    // Here you would typically send the assigned tasks to your backend
    console.log('Tasks assigned:', generatedTasks);
    // setIsOpen(false);
    resetModal();
  };

  const resetModal = (): void => {
    setCurrentStep('upload');
    setUploadedFile(null);
    setGeneratedTasks([]);
    setIsGenerating(false);
  };

  const getPriorityColor = (priority: Task['priority']): string => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAssignedMember = (memberId: number | null): WorkspaceMember | undefined => {
    if (memberId === null) return undefined;
    return workspaceMembers.find(member => member.id === memberId);
  };

  const formatFileSize = (bytes: number): string => {
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 'upload': return 'Upload Product Requirement Document';
      case 'generate': return 'Generating Tasks...';
      case 'assign': return 'Assign Tasks to Team Members';
      default: return '';
    }
  };

  const assignedTasksCount = generatedTasks.filter(task => task.assignedTo !== null).length;

  return (
    <div className="p-8">
      {props.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {getStepTitle()}
              </h2>
              <button
                onClick={() => props.onClose()}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Step 1: Upload */}
              {currentStep === 'upload' && (
                <div className="space-y-6">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {uploadedFile ? (
                      <div className="flex items-center justify-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="text-lg font-medium text-gray-900">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Drop your PRD here or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports PDF, DOC, DOCX files up to 10MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block mt-4 bg-primary text-primary-foreground shadow hover:bg-primary/90 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      {uploadedFile ? 'Change File' : 'Browse Files'}
                    </label>
                  </div>

                  {uploadedFile && (
                    <div className="flex justify-end">
                        <Button onClick={generateTasks}>
                        <Plus />
                            Generate Tasks
                        </Button>
                      {/* <button
                        onClick={generateTasks}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Generate Tasks
                      </button> */}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Generating */}
              {currentStep === 'generate' && (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your PRD...</h3>
                  <p className="text-gray-600">
                    Our AI is reading through your document and generating relevant tasks
                  </p>
                </div>
              )}

              {/* Step 3: Assign Tasks */}
              {currentStep === 'assign' && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        Generated {generatedTasks.length} tasks from your PRD
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {generatedTasks.map((task) => {
                      const assignedMember = getAssignedMember(task.assignedTo);
                      
                      return (
                        <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                              <div className="flex items-center gap-3 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                  {task.priority} Priority
                                </span>
                                <span className="text-gray-500">
                                  <Clock className="w-4 h-4 inline mr-1" />
                                  {task.estimatedHours}h
                                </span>
                                <span className="text-gray-500">{task.category}</span>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-100 pt-3">
                            {assignedMember ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                    {assignedMember.avatar}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{assignedMember.name}</p>
                                    <p className="text-sm text-gray-500">{assignedMember.role}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => unassignTask(task.id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Unassign
                                </button>
                              </div>
                            ) : (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Assign to team member:
                                </label>
                                <select
                                  onChange={(e) => {
                                    const memberId = parseInt(e.target.value);
                                    if (!isNaN(memberId)) {
                                      assignTask(task.id, memberId);
                                    }
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  defaultValue=""
                                >
                                  <option value="">Select team member...</option>
                                  {workspaceMembers.map((member) => (
                                    <option key={member.id} value={member.id}>
                                      {member.name} - {member.role}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {assignedTasksCount} of {generatedTasks.length} tasks assigned
                    </div>
                    <div className="flex gap-3">
                         <Button onClick={resetModal} variant='outline'>
                            Start Over
                        </Button>
                        <Button onClick={handleFinish}>
                        Create Tasks
                        </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PRDTaskModal;