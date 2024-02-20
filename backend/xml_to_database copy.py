import xml.etree.ElementTree as ET
import os
import django
import json
# from bs4 import BeautifulSoup
# from bs4.element import MarkupResemblesUnicode
# from galleryfield.models import BuiltInGalleryImage
from django.conf import settings
from django.core.management import call_command
from django.core.files import File
import io
# import chardet
import codecs
# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
# Manually configure Django settings if running outside the Django project
if not settings.configured:
    settings.configure()

# Import your Django models
from filmes.models import Filme

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
        # nested_data = element.findall('item')
        print(item)
        # for item in nested_data:
        #     element_string = ET.tostring(item, encoding='unicode')
        #     # Extract the data from the XML element
        #     # Modify the code below according to your XML structure
        #     # field2 = element.find('post_author').text
        #     # field3 = element.find('post_date').text
        #         # Modify the code below according to your XML structure
            
        title = item.findtext('title')
        # ats = title.split("\n\t\t\t\t")
        # leng = len(ats)
        # year = title[- 4 :]
        print(title)
        #     field2 = item.findtext('post_id')
        #     field3 = item.findtext('link')
        #     field4 = item.findtext('post_name')
        #             # Extract data from meta_key and meta_value elements
        #     meta_data = item.findall('postmeta', namespace)
            
        #     meta_key_values = []
        #     images_obj =[]
        #     for meta_element in meta_data:
        #         meta_key = meta_element.findtext('meta_key', namespace)
        #         meta_value = meta_element.findtext('meta_value', namespace)
        #         data = meta_value
        #         parsed_data = {}
        #         if meta_key == '_gridder_json':
        #             parsed_data = json.loads(meta_value)
        #             for m in parsed_data['cont']:
        #                 item_type = m['type']
        #                 item_cont = m['cont']
                        
        #                 if item_type == 'text':
        #                     soup = BeautifulSoup(item_cont, 'html.parser')
        #                     # Manually escape characters
               
        #                     plain_text = soup.prettify()
        #                     # if plain_text.startswith(codecs.BOM_UTF8.decode()):
        #                     #     encoding = 'utf-8-sig'
        #                     #     plain_text = plain_text[len(codecs.BOM_UTF8):]  # Remove BOM
        #                     # else:
        #                     #     result = chardet.detect(plain_text.encode())
        #                     #     encoding = result.get('encoding', 'utf-8')  # Set default encoding to utf-8

        #                     # # Decode the plain_text
        #                     # decoded_text = plain_text.encode(encoding)
        #                     meta_key_values=plain_text
        #                     # try:
        #                     #     print(f"Decoded Text: {decoded_text}")
        #                     # except UnicodeEncodeError:
        #                     #     fallback_text = ''.join(c if ord(c) < 128 else f"\\u{ord(c):04x}" for c in decoded_text)
        #                     #     print(f"Decoded Text (Fallback): {fallback_text}")
        #                     print(f"Cont: {meta_key_values}")
                            
        #                 if item_type == 'carousel':
        #                     item_carousel = m['carousel']
        #                     # parsed_data = json.loads(item_carousel)
        #                     for img in item_carousel:
        #                         # Assuming you have the filename stored in a variable called `image_filename`
        #                         image_filename = img['cont']
        #                         # root_folder = os.path.normpath(root_folder)
        #                         root_folder = os.getcwd()
        #                         # Get the directory name
        #                         dir_name = os.path.dirname(image_filename)

        #                         # Get the base name (filename)
        #                         filename = os.path.basename(image_filename)

        #                         # Construct the absolute path
        #                         absolute_path = os.path.join(root_folder, dir_name, filename)

        #                         # Normalize the path to convert backslashes to forward slashes
        #                         absolute_path = os.path.normpath(absolute_path)

        #                         # Now, the 'absolute_path' variable contains the absolute path to the image file with forward slashes
        #                         # print(root_folder,absolute_path,filename)
        #                         new_image = BuiltInGalleryImage()
        #                         with open(absolute_path, 'rb') as f:
        #                             django_file = File(f)
        #                             new_image.creator_id = 1
        #                             new_image.caption = 1
        #                             new_image.image.save(filename, django_file)
        #                         new_image.save()
        #                         # print(new_image)
                 
        #                         images_obj.append(new_image.id)
        #                         # image_id = my_image.id
        #                         # print(f"carousel: {new_image.pk}")
                            
        #             # print(parsed_data)
        #     # with open('output.txt', 'w', encoding='utf-8') as file:
        #     #     file.write(meta_key_values)
        #     # print(meta_key_values)
        #     # Create a new instance of WpPosts and set its fields
        #     new_instance = Project()
        #     new_instance.title = item.findtext('title', default='')
        #     new_instance.year = year
        #     # print(new_instance.year)
        #     new_instance.galery = images_obj
        #     new_instance.slug = field4
        #     new_instance.content = meta_key_values
        #     # meta_key_values = ''
        #     # print(new_instance.content)
        #     # Save the new instance to the database
        #     new_instance.save()

    print('Database population completed.')


if __name__ == '__main__':
    # Get the path to the current directory
    current_directory = os.path.dirname(os.path.abspath(__file__))

    # Provide the XML file name
    xml_file_name = './filme.xml'

    # Create the full path to the XML file
    xml_file_path = os.path.join(current_directory, xml_file_name)

    populate_database_from_xml(xml_file_name)
