import xml.etree.ElementTree as ET
import os
import django
import json
from django.db.models import Max

# from bs4 import BeautifulSoup
# from bs4.element import MarkupResemblesUnicode
# from galleryfield.models import BuiltInGalleryImage
from django.conf import settings
from django.core.management import call_command
from django.core.files import File
import io
# import chardet
import codecs
# from backend.filmes import models
# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
# Manually configure Django settings if running outside the Django project
if not settings.configured:
    settings.configure()

# Import your Django models
from filmes.models import *

# Import the BuiltInGalleryImage model from the correct module
# 

def populate_database_from_xml(xml_file):
    # Parse the XML file
    # namespace = {'wp': 'http://arquivo.veramota.com'}
    # for prefix, uri in namespace.items():
    #     ET.register_namespace(prefix, uri)
    tree = ET.parse(xml_file)
    root = tree.getroot()
    print(root)

    # from galleryfield.models import BuiltInGalleryImage
    # Iterate over the XML elements and populate the database
    for item in root:
        print(item, '_________________________________________________________________')
        
# --------------------------------------------------------------------------------------------------

    print('Database population completed.')


if __name__ == '__main__':
    # Get the path to the current directory
    current_directory = os.path.dirname(os.path.abspath(__file__))

    # Provide the XML file name
    xml_file_name = './page.xml'

    # Create the full path to the XML file
    xml_file_path = os.path.join(current_directory, xml_file_name)

    populate_database_from_xml(xml_file_name)


