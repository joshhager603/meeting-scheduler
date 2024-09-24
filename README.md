
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

## Usage

### Calendar Commands

- **Create a Calendar**:
    ```bash
    python3 cli.py create-calendar-cli
    ```
    **Prompts for:**
    - `Calendar Title`: The title of the calendar.
    - `Details`: A description of the calendar.
    - `Meeting Ids (comma separated)`: (Optional) A list of meeting IDs that are part of this calendar.

- **Read a Calendar**:
    ```bash
    python3 cli.py read-calendar-cli <calendar_id>
    ```

- **Update a Calendar**:
    ```bash
    python3 cli.py update-calendar-cli <calendar_id> --title "New Title" --details "Updated details"
    ```

- **Delete a Calendar**:
    ```bash
    python3 cli.py delete-calendar-cli <calendar_id>
    ```

- **List All Calendars**:
    ```bash
    python3 cli.py list-calendars-cli
    ```

### Meeting Commands

- **Create a Meeting**:
    ```bash
    python3 cli.py create-meeting-cli
    ```

- **Read a Meeting**:
    ```bash
    python3 cli.py read-meeting-cli <meeting_id>
    ```

- **Update a Meeting**:
    ```bash
    python3 cli.py update-meeting-cli <meeting_id> --title "New Title"
    ```

- **Delete a Meeting**:
    ```bash
    python3 cli.py delete-meeting-cli <meeting_id>
    ```

- **List All Meetings**:
    ```bash
    python3 cli.py list-meetings-cli
    ```

### Participant Commands

- **Create a Participant**:
    ```bash
    python3 cli.py create-participant-cli
    ```

- **Read a Participant**:
    ```bash
    python3 cli.py read-participant-cli <participant_id>
    ```

- **Update a Participant**:
    ```bash
    python3 cli.py update-participant-cli <participant_id> --name "New Name"
    ```

- **Delete a Participant**:
    ```bash
    python3 cli.py delete-participant-cli <participant_id>
    ```

- **List All Participants**:
    ```bash
    python3 cli.py read-all-participants-cli
    ```

### Attachment Commands

- **Create an Attachment**:
    ```bash
    python3 cli.py create-attachment-cli
    ```

- **Read an Attachment**:
    ```bash
    python3 cli.py read-attachment-cli <attachment_id>
    ```

- **Update an Attachment**:
    ```bash
    python3 cli.py update-attachment-cli <attachment_id> --url "New URL"
    ```

- **Delete an Attachment**:
    ```bash
    python3 cli.py delete-attachment-cli <attachment_id>
    ```

- **List All Attachments**:
    ```bash
    python3 cli.py read_all_attachments_cli
    ```


## Example Usage

### Calendar Commands

- **Create a Calendar**:
    ```bash
    python3 cli.py create-calendar-cli
    ```
    **Input:**
    ```
    Calendar Title: Project X Meetings
    Details: Meetings related to Project X
    Meeting Ids (comma separated): 
    ```
    **Output:**
    ```
    Calendar created with ID: 1
    ```

- **Read a Calendar**:
    ```bash
    python3 cli.py read-calendar-cli 1
    ```
    **Output:**
    ```
    Calendar: {'id': 1, 'title': 'Project X Meetings', 'details': 'Meetings related to Project X', 'meeting_ids': []}
    ```

- **Update a Calendar**:
    ```bash
    python3 cli.py update-calendar-cli 1 --title "Updated Project X Meetings" --details "Updated details for Project X"
    ```
    **Output:**
    ```
    Calendar updated: {'id': 1, 'title': 'Updated Project X Meetings', 'details': 'Updated details for Project X', 'meeting_ids': []}
    ```

- **Delete a Calendar**:
    ```bash
    python3 cli.py delete-calendar-cli 1
    ```
    **Output:**
    ```
    Calendar 1 deleted.
    ```

- **List All Calendars**:
    ```bash
    python3 cli.py list-calendars-cli
    ```
    **Output:**
    ```
    All Calendars: []
    ```

### Meeting Commands

- **Create a Meeting**:
    ```bash
    python3 cli.py create-meeting-cli
    ```
    **Input:**
    ```
    Meeting Title: Weekly Sync
    Date and Time (YYYY-MM-DD HH:MM (A/P)M): 2023-09-25 10:00 AM
    Location: Conference Room A
    Details: Discuss project updates
    Calendar IDs (comma separated, no spaces): 1
    Participants IDs (comma separated, no spaces): 
    Attachments IDs (comma separated, no spaces): 
    ```
    **Output:**
    ```
    Meeting created with ID: 1
    ```

- **Read a Meeting**:
    ```bash
    python3 cli.py read-meeting-cli 1
    ```
    **Output:**
    ```
    Meeting: {'id': 1, 'title': 'Weekly Sync', 'date_and_time': '2023-09-25 10:00 AM', 'location': 'Conference Room A', 'details': 'Discuss project updates', 'calendar_ids': [1], 'participant_ids': [], 'attachment_ids': []}
    ```

- **Update a Meeting**:
    ```bash
    python3 cli.py update-meeting-cli 1 --title "Updated Weekly Sync"
    ```
    **Output:**
    ```
    Meeting updated: {'id': 1, 'title': 'Updated Weekly Sync', 'date_and_time': '2023-09-25 10:00 AM', 'location': 'Conference Room A', 'details': 'Discuss project updates', 'calendar_ids': [1], 'participant_ids': [], 'attachment_ids': []}
    ```

- **Delete a Meeting**:
    ```bash
    python3 cli.py delete-meeting-cli 1
    ```
    **Output:**
    ```
    Meeting 1 deleted.
    ```

- **List All Meetings**:
    ```bash
    python3 cli.py list-meetings-cli
    ```
    **Output:**
    ```
    All Meetings: []
    ```

### Participant Commands

- **Create a Participant**:
    ```bash
    python3 cli.py create-participant-cli
    ```
    **Input:**
    ```
    Participant ID: 
    Meeting ID: 1
    Participant Name: John Doe
    Participant Email: john@example.com
    ```
    **Output:**
    ```
    Participant created with ID: 1
    ```

- **Read a Participant**:
    ```bash
    python3 cli.py read-participant-cli 1
    ```
    **Output:**
    ```
    Participant: {'id': 1, 'meeting_id': 1, 'name': 'John Doe', 'email': 'john@example.com'}
    ```

- **Update a Participant**:
    ```bash
    python3 cli.py update-participant-cli 1 --name "John Smith"
    ```
    **Output:**
    ```
    Participant updated: {'id': 1, 'meeting_id': 1, 'name': 'John Smith', 'email': 'john@example.com'}
    ```

- **Delete a Participant**:
    ```bash
    python3 cli.py delete-participant-cli 1
    ```
    **Output:**
    ```
    Participant 1 deleted.
    ```

- **List All Participants**:
    ```bash
    python3 cli.py read-all-participants-cli
    ```
    **Output:**
    ```
    No participants found
    ```

### Attachment Commands

- **Create an Attachment**:
    ```bash
    python3 cli.py create-attachment-cli
    ```
    **Input:**
    ```
    Attachment ID: 
    Meeting ID: 1
    Attachment URL: http://example.com/document.pdf
    ```
    **Output:**
    ```
    Attachment created with ID: 1
    ```

- **Read an Attachment**:
    ```bash
    python3 cli.py read-attachment-cli 1
    ```
    **Output:**
    ```
    Attachment: {'id': 1, 'meeting_id': 1, 'url': 'http://example.com/document.pdf'}
    ```

- **Update an Attachment**:
    ```bash
    python3 cli.py update-attachment-cli 1 --url "http://example.com/new-document.pdf"
    ```
    **Output:**
    ```
    Attachment updated: {'id': 1, 'meeting_id': 1, 'url': 'http://example.com/new-document.pdf'}
    ```

- **Delete an Attachment**:
    ```bash
    python3 cli.py delete-attachment-cli 1
    ```
    **Output:**
    ```
    Attachment 1 deleted.
    ```

- **List All Attachments**:
    ```bash
    python3 cli.py read_all_attachments_cli
    ```
    **Output:**
    ```
    No attachments found
    ```
