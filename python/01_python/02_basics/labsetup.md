# Lab Setup Guide

## Step 1: Setup Python as an Environment Variable

Follow these steps to add Python to your system environment variables:

1. Locate the `auto_set_python_env.bat` file in the project directory *(Navigate via File Explorer)*.
2. Right-click on the file and select **Run as administrator**.
3. Wait for the script to finish. You should see a confirmation message and a prompt to press any key to exit.
4. **Restart your terminal or computer** to apply changes to the system PATH.

> **Note:**
> Before installing any Python packages, ensure that the above steps are completed successfully. This ensures Python is correctly configured in your environment variables.

---

## Step 2: Install Jupyter and Run Notebooks in VS Code

Follow these steps to install Jupyter and use it via the Python extension in VS Code:

### 1. Install Python Extension in VS Code

* Open VS Code.
* Go to **Extensions** (Ctrl+Shift+X).
* Search for "**Python**" and install the extension by Microsoft.

### 2. Install Jupyter Extension

* In Extensions, search for "**Jupyter**".
* Install the "**Jupyter**" extension by Microsoft.

### 3. Setup and Run Notebooks

* Open a terminal in VS Code (\`Ctrl + \`\` or **Terminal > New Terminal**).
* Run the following command to install Jupyter:

  ```bash
  pip install jupyter
  ```
* Open an existing `.ipynb` file from the file explorer.
* To run a cell, click the **Run** button next to the cell or press `Shift+Enter`.

> If prompted, install or enable the suggested extensions.

### 4. Select Python Environment

* Choose the Python interpreter you want to use (e.g., Python 3.x).
* You can now run Jupyter notebooks inside VS Code.

---