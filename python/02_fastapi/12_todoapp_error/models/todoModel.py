class Todo:
    def __init__(self, id: int, title: str, completed: bool = False):
        self.id = id
        self.title = title # validation
        self.completed = completed