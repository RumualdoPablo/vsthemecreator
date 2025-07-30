export const pythonSample = {
    filename: 'task_manager.py',
    code: `from typing import List, Dict, Optional, Union
from dataclasses import dataclass
from datetime import datetime
from enum import Enum
import json

class Priority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

@dataclass
class Task:
    id: str
    title: str
    completed: bool
    priority: Priority
    created_at: datetime
    
    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'title': self.title,
            'completed': self.completed,
            'priority': self.priority.value,
            'created_at': self.created_at.isoformat()
        }

class TaskManager:
    def __init__(self, tasks: Optional[List[Task]] = None):
        self.tasks = tasks or []
        self.filter_type = "all"
        self.search_term = ""
    
    def add_task(self, title: str, priority: Priority = Priority.MEDIUM) -> Task:
        """Add a new task to the manager."""
        task = Task(
            id=str(len(self.tasks) + 1),
            title=title,
            completed=False,
            priority=priority,
            created_at=datetime.now()
        )
        self.tasks.append(task)
        return task
    
    def filter_tasks(self) -> List[Task]:
        """Filter tasks based on current filter and search term."""
        filtered_tasks = self.tasks
        
        # Apply filter
        if self.filter_type == "completed":
            filtered_tasks = [task for task in filtered_tasks if task.completed]
        elif self.filter_type == "pending":
            filtered_tasks = [task for task in filtered_tasks if not task.completed]
        
        # Apply search
        if self.search_term:
            filtered_tasks = [
                task for task in filtered_tasks 
                if self.search_term.lower() in task.title.lower()
            ]
        
        return filtered_tasks
    
    def get_statistics(self) -> Dict[str, int]:
        """Calculate and return task statistics."""
        total = len(self.tasks)
        completed = len([task for task in self.tasks if task.completed])
        pending = total - completed
        
        return {
            'total': total,
            'completed': completed,
            'pending': pending
        }
    
    def toggle_task(self, task_id: str) -> bool:
        """Toggle the completion status of a task."""
        for task in self.tasks:
            if task.id == task_id:
                task.completed = not task.completed
                return True
        return False
    
    def bulk_action(self, action: str) -> None:
        """Perform bulk actions on tasks."""
        if action == "complete_all":
            for task in self.tasks:
                task.completed = True
        elif action == "clear_completed":
            self.tasks = [task for task in self.tasks if not task.completed]
    
    def save_to_file(self, filename: str) -> None:
        """Save tasks to a JSON file."""
        with open(filename, 'w') as f:
            json.dump([task.to_dict() for task in self.tasks], f, indent=2)
    
    def load_from_file(self, filename: str) -> None:
        """Load tasks from a JSON file."""
        try:
            with open(filename, 'r') as f:
                data = json.load(f)
                self.tasks = []
                for task_data in data:
                    task = Task(
                        id=task_data['id'],
                        title=task_data['title'],
                        completed=task_data['completed'],
                        priority=Priority(task_data['priority']),
                        created_at=datetime.fromisoformat(task_data['created_at'])
                    )
                    self.tasks.append(task)
        except FileNotFoundError:
            print(f"File {filename} not found.")
        except json.JSONDecodeError:
            print(f"Invalid JSON in file {filename}.")

# Example usage
if __name__ == "__main__":
    manager = TaskManager()
    
    # Add some sample tasks
    manager.add_task("Learn Python", Priority.HIGH)
    manager.add_task("Write documentation", Priority.MEDIUM)
    manager.add_task("Fix bugs", Priority.LOW)
    
    # Display statistics
    stats = manager.get_statistics()
    print(f"Total tasks: {stats['total']}")
    print(f"Completed: {stats['completed']}")
    print(f"Pending: {stats['pending']}")
    
    # Filter and display tasks
    manager.filter_type = "pending"
    pending_tasks = manager.filter_tasks()
    for task in pending_tasks:
        print(f"- {task.title} ({task.priority.value})")`
}; 