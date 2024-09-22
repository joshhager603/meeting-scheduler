from meetings import *
from calendars import *
from participants import *
from attachments import *
from tinydb import TinyDB, Query
import click


@click.command()
def main():
    db = TinyDB('db.json')
    
    #input('What would you like to do?\n')

if __name__ == '__main__':
    main()



