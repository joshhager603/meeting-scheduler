
# Meeting Scheduler

This is a web application for managing calendars. It allows you to create, read, update, and delete calendars with meeting information.

## Installation

This is application is designed with a layered architecture to be run on three separate machines.  One machine will host the database, which is run in mysql, the second machine will host the backend, which is run in Python using the Django library, and the third machine will host the frontend, which is run in JavaScript using React.js.

**NOTE:** All machines ***MUST*** be on the same WiFi network!

### Database Machine Setup

The database machine should have mysql installed as a prerequisite.  On Mac and Linux, you can run `brew install mysql` to install using Homebrew.  On Windows, you can search the internet for a mysql installer. The version of mysql used in this project is **9.0.1**.

1. Create a mysql database called "meeting_scheduler".

    In a terminal, run `mysql` to open up the mysql terminal. Then, execute the command `CREATE DATABASE meeting_scheduler;`.

3. Next, you will need the IP address of the machine hosting the backend. After you have it, run the following commands:

    `CREATE USER '{root}'@'{ip of backend machine}' IDENTIFIED BY '{joosh123}';`

    `GRANT ALL PRIVILEGES ON meeting_scheduler.* TO '{root}'@'{ip of backend machine}' WITH GRANT OPTION;`

    "root" and "joosh123" are the default username and password specified in the `.env` file in the backend. If you would like a different username and password, you must also change these values in the `.env` file in the backend.


### Backend Machine Setup

The backend machine should have both Python and pip installed as a prerequisite.

1. First, clone the repository to your local machine:

    ```bash
    git clone https://github.com/joshhager603/meeting-scheduler.git
    cd meeting-scheduler
    ```

2. Set Up a Virtual Environment (Optional but Recommended)

    It's recommended to set up a virtual environment to keep dependencies isolated:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On macOS and Linux
    # On Windows use: venv\Scripts\activate
    ```

3. Install Dependencies

    After setting up the virtual environment, install the dependencies using `pip`:

    ```bash
    pip install -r requirements.txt
    ```

4. Modify the `.env` file

### Frontend Machine Setup

The frontend machine should have Node.js and React.js installed as a prerequisite.

1. First, clone the repository to your local machine:

    ```bash
    git clone https://github.com/joshhager603/meeting-scheduler.git
    cd meeting-scheduler
    ```