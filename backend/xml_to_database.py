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
        print(item, '_________________________________________________________________')
        title = item.findtext('title')
        ano = item.findtext('ano')
        com = item.findtext('com')
        distribuicao_comercial = {
            'estrear_em_sala': item.findtext('distribuicao_comercial_0_estreia_em_sala'),
            'pais': item.findtext('distribuicao_comercial_0_pais'),
            'tv': item.findtext('distribuicao_comercial_0_tv'),
            'vod': item.findtext('distribuicao_comercial_0_vod')
        }
        equipa_argumento = item.findtext('equipa_argumento')
        equipa_producao = item.findtext('equipa_producao')
        equipa_realizacao = item.findtext('equipa_realizacao')
        festivais = [
            item.findtext('festivais_0_festival'),
            item.findtext('festivais_1_festival'),
            item.findtext('festivais_2_festival'),
            item.findtext('festivais_3_festival'),
            item.findtext('festivais_4_festival'),
            item.findtext('festivais_5_festival'),
            item.findtext('festivais_6_festival'),
            item.findtext('festivais_7_festival'),
            item.findtext('festivais_8_festival'),
            item.findtext('festivais_9_festival')
        ]
        ficha_tecnica_ano = item.findtext('ficha_tecnica_ano')
        ficha_tecnica_duracao = item.findtext('ficha_tecnica_duracao')
        ficha_tecnica_genero = item.findtext('ficha_tecnica_genero')
        ficha_tecnica_suporte = item.findtext('ficha_tecnica_suporte')
        financiamento_financiadores = item.findtext('financiamento_financiadores')
        financiamento_orcamento = item.findtext('financiamento_orcamento')
        imprensa = [
            {
                'artigo': item.findtext('imprensa_pais_0_artigo'),
                'links': [{
                    'link': item.findtext('imprensa_pais_0_artigo_0_links_0_link'),
                    'titulo': item.findtext('imprensa_pais_0_artigo_0_titulo')
                }]
            },
            {
                'artigo': item.findtext('imprensa_pais_1_artigo'),
                'links': [
                    {
                        'link': item.findtext('imprensa_pais_1_artigo_0_links_0_link'),
                        'titulo': item.findtext('imprensa_pais_1_artigo_0_titulo')
                    },
                    {
                        'link': item.findtext('imprensa_pais_1_artigo_1_links_0_link'),
                        'titulo': item.findtext('imprensa_pais_1_artigo_1_titulo')
                    },
                    {
                        'link': item.findtext('imprensa_pais_1_artigo_2_links_0_link'),
                        'titulo': item.findtext('imprensa_pais_1_artigo_2_titulo')
                    },
                    {
                        'link': item.findtext('imprensa_pais_1_artigo_3_links_0_link'),
                        'titulo': item.findtext('imprensa_pais_1_artigo_3_titulo')
                    },
                    {
                        'link': item.findtext('imprensa_pais_1_artigo_4_links_0_link'),
                        'titulo': item.findtext('imprensa_pais_1_artigo_4_titulo')
                    }
                ],
                'nome': item.findtext('imprensa_pais_1_nome')
            }
        ]
        outros_videos = [
            {'link': item.findtext('outros_videos_0_link'), 'titulo': item.findtext('outros_videos_0_titulo')},
            {'link': item.findtext('outros_videos_1_link'), 'titulo': item.findtext('outros_videos_1_titulo')},
            {'link': item.findtext('outros_videos_2_link'), 'titulo': item.findtext('outros_videos_2_titulo')}
        ]
        palavras_sobre = [
            {'texto': item.findtext('palavras_sobre_0_texto'), 'titulo': item.findtext('palavras_sobre_0_titulo')},
            {'texto': item.findtext('palavras_sobre_1_texto'), 'titulo': item.findtext('palavras_sobre_1_titulo')},
            {'texto': item.findtext('palavras_sobre_2_texto'), 'titulo': item.findtext('palavras_sobre_2_titulo')},
            {'texto': item.findtext('palavras_sobre_3_texto'), 'titulo': item.findtext('palavras_sobre_3_titulo')}
        ]
        # premios = [
        #     item.findtext('premios_0_premio'),
        #     item.findtext('premios_1_premio'),
        #     item.findtext('premios_2_premio'),
        #     item.findtext('premios_3_premio'),
        #     item.findtext('premios_4_premio'),
        #     item.findtext('premios_5_premio'),
        #     item.findtext('premios_6_premio'),
        #     item.findtext('premios_7_premio'),
        #     item.findtext('premios_8_premio'),
        #     item.findtext('premios_9_premio'),
        #     item.findtext('premios_10_premio'),
        #     item.findtext('premios_11_premio'),
        #     item.findtext('premios_12_premio'),
        #     item.findtext('premios_13_premio'),
        #     item.findtext('premios_14_premio'),
        #     item.findtext('premios_15_premio')
        # ]
        premios = []
        i = 0
        while True:
            premio_key = f'premios_{i}_premio'
            premio = item.findtext(premio_key)
            if premio is None:
                break
            premios.append(premio)
            i += 1

        print(premios)
        realizador = item.findtext('realizador')
        sinopse = item.findtext('sinopse')
        tecnicos = [
            {'accao': item.findtext('tecnicos_0_accao'), 'tecnico': item.findtext('tecnicos_0_tecnico')},
            {'accao': item.findtext('tecnicos_1_accao'), 'tecnico': item.findtext('tecnicos_1_tecnico')},
            {'accao': item.findtext('tecnicos_2_accao'), 'tecnico': item.findtext('tecnicos_2_tecnico')},
            {'accao': item.findtext('tecnicos_3_accao'), 'tecnico': item.findtext('tecnicos_3_tecnico')}
        ]
        thumbnail = item.findtext('thumbnail')
        trailer = item.findtext('trailer')
        video_page = item.findtext('video_page')
        videodrop = item.findtext('videodrop')
        vozes = [
            {'voz': item.findtext('vozes_0_voz'), 'vozes': item.findtext('vozes_0_vozes')},
            {'voz': item.findtext('vozes_1_voz'), 'vozes': item.findtext('vozes_1_vozes')},
            {'voz': item.findtext('vozes_2_voz'), 'vozes': item.findtext('vozes_2_vozes')},
            {'voz': item.findtext('vozes_3_voz'), 'vozes': item.findtext('vozes_3_vozes')}
        ]

        
        # Concatenate all the extracted values into a single string
        output = f"Title: {title}\nAno: {ano}\nCom: {com}\nDistribuicao Comercial: {distribuicao_comercial}\nEquipa Argumento: {equipa_argumento}\nEquipa Producao: {equipa_producao}\nEquipa Realizacao: {equipa_realizacao}\nFestivais: {festivais}\nFicha Tecnica Ano: {ficha_tecnica_ano}\nFicha Tecnica Duracao: {ficha_tecnica_duracao}\nFicha Tecnica Genero: {ficha_tecnica_genero}\nFicha Tecnica Suporte: {ficha_tecnica_suporte}\nFinanciamento Financiadores: {financiamento_financiadores}\nFinanciamento Orcamento: {financiamento_orcamento}\nImprensa: {imprensa}\nOutros Videos: {outros_videos}\nPalavras Sobre: {palavras_sobre}\nPremios: {premios}\nRealizador: {realizador}\nSinopse: {sinopse}\nTecnicos: {tecnicos}\nThumbnail: {thumbnail}\nTrailer: {trailer}\nVideo Page: {video_page}\nVideodrop: {videodrop}\nVozes: {vozes}"

        # Print the concatenated string
        # print(output)

 

    print('Database population completed.')


if __name__ == '__main__':
    # Get the path to the current directory
    current_directory = os.path.dirname(os.path.abspath(__file__))

    # Provide the XML file name
    xml_file_name = './filme.xml'

    # Create the full path to the XML file
    xml_file_path = os.path.join(current_directory, xml_file_name)

    populate_database_from_xml(xml_file_name)


    def extract_repeating_fields(item, field_name):
        values = []
        i = 0
        while True:
            field_key = f'{field_name}_{i}'
            field_value = item.findtext(field_key)
            if field_value is None:
                break
            values.append(field_value)
            i += 1
        return values

    # Example usage:
    fields_to_extract = ['premios', 'palavras_sobre', 'outros_fields']  # Add other field names here
    data = {}
    for field_name in fields_to_extract:
        values = extract_repeating_fields(item, field_name)
        data[field_name] = values

    print(data)