# Virtual Environment Setup

## Install Python 3.11 ( if not already installed )

1. Download the Python 3.11 installer from the official website: [Python Downloads](https://www.python.org/downloads/).
2. Run the installer and follow the installation prompts.
3. Make sure to check the box that says **Add Python to PATH** during installation. 
4. After installation, open a terminal (Command Prompt or PowerShell) and run the following command to verify the installation:

   ```bash
   python --version
   ```

You should see output similar to `Python 3.11.x`.

---

## Creating a Virtual Environment

To create a virtual environment, navigate to your project directory and run:

```bash
python -m venv venv
```

## Activating the Virtual Environment

### On Windows

```bash
.\venv\Scripts\activate
```

### On macOS and Linux

```bash
source venv/bin/activate
```

## Deactivating the Virtual Environment

To deactivate the virtual environment, simply run:

```bash
deactivate
```
