import xml.etree.ElementTree as ET
import os
import django
import json
from django.conf import settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from django.db.models import Max
from filer.models import Image as FilerImage
from django.core.files.base import ContentFile

# from bs4 import BeautifulSoup
# from bs4.element import MarkupResemblesUnicode
# from galleryfield.models import BuiltInGalleryImage
from django.core.management import call_command
from django.core.files import File
import io
# import chardet
import codecs
# from backend.filmes import models
# Set up Django environment
# Manually configure Django settings if running outside the Django project
if not settings.configured:
    settings.configure()

# Import your Django models
from filmes.models import *

# Import the BuiltInGalleryImage model from the correct module
# 
def create_thumbnail(image_path):
    try:
        # Create a new FilerImage instance
        filer_image = FilerImage()

        # Open the image file
        with open(image_path, 'rb') as f:
            # Set the original image file
            filer_image.original_filename = os.path.basename(image_path)
            filer_image.file = ContentFile(f.read())

        # Save the FilerImage instance to generate thumbnails
        filer_image.save()

        print(f"Thumbnail created successfully for image: {image_path}")
        
        # Return the FilerImage instance
        return filer_image
    except Exception as e:
        print(f"Error creating thumbnail for image {image_path}: {e}")
        return None

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
        category = item.findtext('tiposdefilmes')
        title = item.findtext('title')
        slug = item.findtext('slug')
        ano = item.findtext('ano')
        com = item.findtext('com')
        equipa_argumento = item.findtext('equipa_argumento')
        equipa_producao = item.findtext('equipa_producao')
        equipa_realizacao = item.findtext('equipa_realizacao')

        ficha_tecnica_ano = item.findtext('ficha_tecnica_ano')
        ficha_tecnica_duracao = item.findtext('ficha_tecnica_duracao')
        ficha_tecnica_genero = item.findtext('ficha_tecnica_genero')
        ficha_tecnica_suporte = item.findtext('ficha_tecnica_suporte')
        financiamento_financiadores = item.findtext('financiamento_financiadores')
        financiamento_orcamento = item.findtext('financiamento_orcamento')
        realizador = item.findtext('realizador')
        sinopse = item.findtext('sinopse')
        # thumbnail_path = item.findtext('imagespath')
        # thumbnail = create_thumbnail(thumbnail_path)
        trailer = item.findtext('trailer')
        video_page = item.findtext('video_page')
        videodrop = item.findtext('videodrop')
        vozes_text = item.findtext('vozes')
        if vozes_text:
            vozes_list = [voz.strip() for voz in vozes_text.split('\n') if voz.strip()]
        else:
            vozes_list = []

        # print(vozes_list)
        # Concatenate all the extracted values into a single string
        # output = f"Title: {title}\nAno: {ano}\nCom: {com}\nDistribuicao Comercial: {distribuicao_comercial}\nEquipa Argumento: {equipa_argumento}\nEquipa Producao: {equipa_producao}\nEquipa Realizacao: {equipa_realizacao}\nFestivais: {festivais}\nFicha Tecnica Ano: {ficha_tecnica_ano}\nFicha Tecnica Duracao: {ficha_tecnica_duracao}\nFicha Tecnica Genero: {ficha_tecnica_genero}\nFicha Tecnica Suporte: {ficha_tecnica_suporte}\nFinanciamento Financiadores: {financiamento_financiadores}\nFinanciamento Orcamento: {financiamento_orcamento}\nImprensa: {imprensa}\nOutros Videos: {outros_videos}\nPalavras Sobre: {palavras_sobre}\nPremios: {premios}\nRealizador: {realizador}\nSinopse: {sinopse}\nTecnicos: {tecnicos}\nThumbnail: {thumbnail}\nTrailer: {trailer}\nVideo Page: {video_page}\nVideodrop: {videodrop}\nVozes: {vozes_list}"

        # Print the concatenated string
        # print(output)
        filme = Filme.objects.create(
            category=category,
            title=title,
            slug=slug,
            ano=ano,
            com=com,
            realizador=realizador,
            sinopse=sinopse,
            # thumbnail=thumbnail,
            trailer=trailer,
            video_page=video_page,
            videodrop=videodrop,
            vozes=vozes_list,
            equipa_argumento=equipa_argumento,
            equipa_producao=equipa_producao,
            equipa_realizacao=equipa_realizacao,
            ficha_tecnica_ano=ficha_tecnica_ano,
            ficha_tecnica_duracao=ficha_tecnica_duracao,
            ficha_tecnica_genero=ficha_tecnica_genero,
            ficha_tecnica_suporte=ficha_tecnica_suporte,
            financiamento_financiadores=financiamento_financiadores,
            financiamento_orcamento=financiamento_orcamento,
            
        )

        # Save the filme instance to the database
        filme.save()
        print(filme.pk)
# --------------------------------------------------------------------------------------------------

        outros_videos = []
        i = 0
        while True:
            link_key = f'outros_videos_{i}_link'
            titulo_key = f'outros_videos_{i}_titulo'
            link = item.findtext(link_key)
            titulo = item.findtext(titulo_key)
            if link is None or titulo is None:
                break
            outro_video = OutrosVideos.objects.create(
                # id=last_outros_video_id + 1 + i,
                titulo=titulo,
                link=link,
                filme_id=filme.pk
            )
            outros_videos.append(outro_video)
            i += 1
  
        # print(outros_videos)
# --------------------------------------------------------------------------------------------------

        tecnicos = []

        i = 0
        while True:
            tecnico_key = f'tecnicos_{i}_tecnico'
            accao_key = f'tecnicos_{i}_accao'
            
            tecnico = item.findtext(tecnico_key)
            accao = item.findtext(accao_key)
            
            if tecnico is None or accao is None:
                break

            tecnico_obj = Tecnicos.objects.create(
                tecnico=tecnico,
                accao=accao,
                filme_id=filme.pk
            )
            tecnicos.append(tecnico_obj)
            
            i += 1
        # print(tecnicos)
# --------------------------------------------------------------------------------------------------

        premios = []

        i = 0
        while True:
            premio_key = f'premios_{i}_premio'
            premio = item.findtext(premio_key)
            
            if premio is None:
                break

            premio_obj = Premios.objects.create(
                premio=premio,
                filme_id=filme.pk
            )
            premios.append(premio_obj)
            
            i += 1   
        # print(premios) 
# --------------------------------------------------------------------------------------------------
        palavras_sobre = []

        i = 0
        while True:
            texto_key = f'palavras_sobre_{i}_texto'
            titulo_key = f'palavras_sobre_{i}_titulo'
            texto = item.findtext(texto_key)
            titulo = item.findtext(titulo_key)
            
            if texto is None or titulo is None:
                break

            palavra_sobre_obj = PalavrasSobre.objects.create(
                texto=texto,
                titulo=titulo,
                filme_id=filme.pk
            )
            palavras_sobre.append(palavra_sobre_obj)
            
            i += 1

        # print(palavras_sobre)
# --------------------------------------------------------------------------------------------------
        imprensa = []

        i = 0
        while True:
            artigo_key = f'imprensa_pais_{i}_artigo'
            nome_key = f'imprensa_pais_{i}_nome'
                    
            if item.findtext(artigo_key) is None:
                break

            artigo = item.findtext(artigo_key)
            nome = item.findtext(nome_key)
            links = []

            j = 0
            while True:
                link_key = f'imprensa_pais_{i}_artigo_{j}_links_0_link'
                titulo_key = f'imprensa_pais_{i}_artigo_{j}_titulo'
                        
                if item.findtext(link_key) is None:
                    break
                        
                link = item.findtext(link_key)
                titulo = item.findtext(titulo_key)
                        
                links.append({'link': link, 'titulo': titulo})
                j += 1

            for link_info in links:
                imprensa_obj = Imprensa.objects.create(
                    artigo=artigo,
                    pais=nome,
                    link=link_info['link'],
                    titulo=link_info['titulo'],
                    filme_id=filme.pk
                )
                imprensa.append({'artigo': artigo, 'titulo': link_info['titulo'], 'link': link_info['link'], 'pais': nome})

            i += 1

# --------------------------------------------------------------------------------------------------
        festivais = []

        i = 0
        while True:
            festival_key = f'festivais_{i}_festival'
            festival = item.findtext(festival_key)
            
            if festival is None:
                break
            
            festival_obj = Festivais.objects.create(
                festival=festival,
                filme_id=filme.pk
            )
            festivais.append(festival)
            i += 1
        # print(festivais)
# --------------------------------------------------------------------------------------------------
        distribuicao_comercial = []

        i = 0
        while True:
            prefix = f'distribuicao_comercial_{i}_'
            estreia_em_sala = item.findtext(prefix + 'estreia_em_sala')
            pais = item.findtext(prefix + 'pais')
            tv = item.findtext(prefix + 'tv')
            vod = item.findtext(prefix + 'vod')

            # If any of the fields is None, it means there are no more entries
            if estreia_em_sala is None or pais is None or tv is None or vod is None:
                break

            comercial_obj = Comercial.objects.create(
                estreia=estreia_em_sala,
                pais=pais,
                tv=tv,
                vod=vod,
                filme_id=filme.pk
            )

            distribuicao_comercial.append({
                'estreia_em_sala': estreia_em_sala,
                'pais': pais,
                'tv': tv,
                'vod': vod
            })

            i += 1
        # print(distribuicao_comercial)
# --------------------------------------------------------------------------------------------------

    print('Database population completed.')


if __name__ == '__main__':
    # Get the path to the current directory
    current_directory = os.path.dirname(os.path.abspath(__file__))

    # Provide the XML file name
    xml_file_name = './filme.xml'

    # Create the full path to the XML file
    xml_file_path = os.path.join(current_directory, xml_file_name)

    populate_database_from_xml(xml_file_name)


