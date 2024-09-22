
# Meeting Scheduler

This is a command-line interface (CLI) application for managing calendars. It allows you to create, read, update, and delete calendars with meeting information.

## Installation

To run this project, you need to have Python 3 installed. You will also need `pip` to install the required dependencies.

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/joshhager603/meeting-scheduler.git
cd meeting-scheduler
```

### Step 2: Set Up a Virtual Environment (Optional but Recommended)

It's recommended to set up a virtual environment to keep dependencies isolated:

```bash
python3 -m venv venv
source venv/bin/activate  # On macOS and Linux
# On Windows use: venv\Scripts\activate
```

### Step 3: Install Dependencies

After setting up the virtual environment, install the dependencies using `pip`:

```bash
pip install -r requirements.txt
```

If you don't have a `requirements.txt` file, install dependencies manually:

```bash
pip install tinydb click uuid
```

### Step 4: Running the CLI Application

Once the dependencies are installed, you can run the CLI application.

### Create a Calendar

To create a calendar, use the following command:

```bash
python3 cli.py create-calendar-cli
```

You will be prompted to enter the following details:

- `Calendar Title`: The title of the calendar.
- `Details`: A description of the calendar.
- `Meeting Ids (comma separated)`: (Optional) A list of meeting IDs that are part of this calendar.

### Example Usage:

```bash
python3 cli.py create-calendar-cli
```

```
Calendar Title: Project X Meetings
Details: Meetings related to Project X
Meeting Ids (comma separated): 
```

This will create a new calendar and return its unique calendar ID.

### Other Commands

- **Read a calendar**: 
    ```bash
    python3 cli.py read-calendar-cli <calendar_id>
    ```
- **Update a calendar**: 
    ```bash
    python3 cli.py update-calendar-cli <calendar_id> --title "New Title" --details "Updated details"
    ```
- **Delete a calendar**: 
    ```bash
    python3 cli.py delete-calendar-cli <calendar_id>
    ```
- **List all calendars**:
    ```bash
    python3 cli.py list-calendars-cli
    ```
