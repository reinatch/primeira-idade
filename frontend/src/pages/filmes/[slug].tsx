import React, { useEffect, useState } from 'react'
import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/router'
import  {useMovieStore}  from "@/store/store";
import Client from '@/libs/client'

import { Movie } from '@/types';
import Player from '@/components/Player';
import Animation from '@/components/Animation';
import Image from 'next/image';
import Layout from '@/components/Layout';

import { Accordion } from "@mantine/core";
import type { AccordionProps } from '@mantine/core';

type MultipleAccordionProps = AccordionProps<true>;

const Page = () => {
  const [value, setValue] = useState<string[]>([]);
        const { movies, movie, fetchMovies,fetchMovie, filter, filteredMovie, setFilter } = useMovieStore((state: any) => state);
  // useEffect(() => {
  //   useMovieStore.getState().setMovie(movies);
  // }, [movies]);
  const router = useRouter();
  const {slug} = router.query;
  useEffect(() => {
    fetchMovie(slug); // Fetch movies when component mounts
  }, [slug]);
    // const {data} = useMovie(slug as string);
    const data: any = movie
    console.log(slug,data, 'page')
  return (
    <Layout>
      <div className="fixed -z-1">
      <Player movie={data}/>
      </div>
     <div className="left-[0] top-[0] w-screen h-[300vh] text-[white] p-[1em] relative ">
        <div className="flex flex-col fullpage-wp">
            <div className="relative flex items-end justify-center w-screen min-h-screen text-center page-1 page bottom-10">
                <div className="thumbtexto-principal absolute w-full z-50 bottom-[1em] text-[white] uppercase m-0 p-0 text-center">
                  <h1 className="titulo-principal font-Favorit leading-[1.5em] font-thin">{ data?.filme.title }</h1>
                  <h2 className="realizador-principal font-Ogg text-[2.4em] leading-[0.5em] font-thin" >
                    { data?.filme.realizador }
                  </h2>
                  <div className="flex justify-center w-full">

                <Image
                  className="w-[2.5em] mt-[2em] ml-[50%] mr-[50%]"
                  src="/assets/Seta-desktop.png"
                  alt="Kitten"
                  width={100}
                  height={100}
                />
                  </div>
                </div>
            </div>



            <div className="w-screen min-h-screen page-2 page">
                  <div className="info principal h-[92vh]">
                  <div className="seccao text-[0.75em] pt-[15vh] flex flex-wrap">
                    <div className="col-6 sino pr-[7.5vw] pl-[40px] justify-between flex [flex-flow:column_wrap]">
                        <h4 className="sinopse uppercase mt-[1em]">SINOPSE</h4>
                        <p className="sinopse-content text-[2.3em] leading-[1.25em]">{ data?.filme.sinopse }</p>
                      <div className="">
                        <Image
                          className="img trailer w-[20vw]"
                          alt=''
                          src={Client + data?.filme.thumbnail.file}
                          fluid-grow
                          width={100}
                          height={100}
                        />
                        <h4 className="trailer uppercase mt-[1em] w-[20vw]">TRAILER</h4>
                      </div>
                    </div>
                    <div className="col-6 seno [columns:150px_2] [column-fill:auto] text-[1.25em] leading-[1.35em] pr-[40px] h-[80vh]">
                      <div className="coluna mb-[1em]">
                        <p className="equipa uppercase mt-[1em]">{ data?.filme.title }</p>
                        <div
                        className='ficha_tecnica'
                        >
                          <div>
                            <span className="font-Ogg"> ano </span>
                            <span className="font-Favorit">{ data?.filme.ficha_tecnica_ano } </span>
                          </div>
                        </div>
                      </div>

                      <div className="coluna mb-[1em]">
                        <p className="uppercase mt-[1em]">equipa</p>
                        {/* <div
                          className=""
                          v-for="(field, name) in filme.acf.equipa"
                        >
                          <div>
                            <span className="font-Ogg"> { name } </span>
                            <span className="font-Favorit">{ field } </span>
                          </div>
                        </div> */}
                      </div>
                      {/* <div v-for="(field, name) in filme.acf.tecnicos">
                        <p className="font-Ogg accao">{ field.tecnico }</p>
                        <p className="font-Favorit reaccao">{ field.accao }</p>
                      </div> */}
                      <div >
                        <h6 className="font-Ogg uppercase mt-[1em]">COM</h6>
                        <p className="font-Favorit">{ data?.filme.com }</p>
                      </div>
                      <div >
                        <h6 className="font-Ogg uppercase mt-[1em]">VOZES</h6>
                        <p className="font-Favorit">{ data?.filme.vozes }</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    className="w-[2.5em] mt-[2em] ml-[50%] mr-[50%]"
                    src="/assets/Seta-desktop.png"
                    alt="Kitten"
                    width={100}
                  height={100}
                  />
                </div>
            </div>



            <div className="w-screen min-h-screen page-3 page">
                    <div className="info h-screen flex flex-wrap pt-[15vh] pl-[2.5em] pr-[2.5em] overflow-y-auto">
                    <Accordion multiple value={value} onChange={setValue} className="grid w-screen grid-cols-4 tab grid-rows-[min-content]" unstyled>
                      <Accordion.Item value="item-1" className="tab  flex-[1_0_25%]">
                        <Accordion.Control className="text-yellow-500 tab-header"><h5 className="text-white">financiamento</h5></Accordion.Control>
                        <Accordion.Panel className="tab flex-[1_0_25%]">
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                            <p >
                              orçamento: { data?.filme.financiamento_orcamento }
                            </p>
                            <p >
                              { data?.filme.financiamento_financiadores}
                            </p>
                            {/* <div >
                              <img
                                v-for="(logo, index) in filme.acf.financiamento.logos"
                                className="img-responsive"
                                v-bind:src="logo.sizes.thumbnail"
                                fluid-grow
                                alt="logo.name"
                              />
                            </div> */}
                          </div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>

                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5 className="text-white">festivais</h5></Accordion.Control>
                        <Accordion.Panel>
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                          {data?.festivais.map((festival:any) => (

                            <p>{ festival.festival }</p>
                          ))}
                          </div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-3" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5 className="text-white">premios</h5></Accordion.Control>
                        <Accordion.Panel>
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content"></div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-4" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5 className="text-white">palavras sobre</h5></Accordion.Control>
                        <Accordion.Panel>
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                            {data?.palavras_sobre.map((item:any) => (

                              <>
                              <p>{item.titulo}</p>
                              <p>{item.texto}</p>
                              </>
                            ))}
               
                          </div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-5" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5 className="text-white">distribuicao comercial</h5></Accordion.Control>
                        <Accordion.Panel> 
                          <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                          {data?.comercial.map((dist:any) => (
                                <>
                              <p >{ dist.pais }</p>
                              <p >
                                estreia em sala { dist.estreia }
                              </p>
                              <p >TV { dist.tv }</p>
                              <p >VOD { dist.vod }</p>
                                </>
                          ))}
              
                          </div>
                        </div></Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-6" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5 className="text-white">imprensa</h5></Accordion.Control>
                        <Accordion.Panel>
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                          {data?.imprensa.map((imprensa:any) => (
                            <>
                              <p>{ imprensa.pais }</p>
                                <a  href={imprensa.link}>
                                  { imprensa.titulo }
                                </a>
                            </>

                          ))}
                          </div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-7" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header">
                          <h5 className="text-white">outros videos</h5>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                          {data?.outros_videos.map((outro:any) => (
                            <>
                              <a href={outro.link}> { outro.titulo }</a>
                            </>

                          ))}
                 
                          </div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-8" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header">
                          <h5 className="text-white">cartaz do filme</h5>
                        </Accordion.Control>
                        <Accordion.Panel>
                           <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          {/* <div className="tab-content">
                            <img
                              className="img-responsive"
                              src="filme.acf.cartaz_do_filme.sizes.thumbnail"
                              fluid-grow
                            />
                          </div> */}
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-9" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header">
                           <h5 className="text-white">galeria de fotogramas</h5>
                        </Accordion.Control>
                        <Accordion.Panel>
                           <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                            
                            {/* <div v-for="(fotograma, index) in filme.acf.galeria_de_fotogramas">
                              <img
                                className="img-responsive"
                                v-bind:src="fotograma.sizes.large"
                                fluid-grow
                              />
                            </div> */}
                          </div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-10" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="text-red-500 tab-header">
                          <h5 className="text-white">galeria de fotografias</h5>
                          </Accordion.Control>
                        <Accordion.Panel>
                          <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                            {/* <div v-for="(fotografia, index) in filme.acf.galeria_de_fotografias">
                              <img
                                className="img-responsive"
                                v-bind:src="fotografia.sizes.large"
                                fluid-grow
                              />
                            </div> */}
                          </div>
                        </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                      
                    </Accordion>

<div className="acordion flex w-full">

                <div className="acordion_titles w-1/2">

                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">financiamento</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">festivais</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">premios</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">palavras sobre</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">distribuicao comercial</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">imprensa</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">outros videos</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">cartaz do filme</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">galeria de fotogramas</span><span className="icon ">→</span>
                    </div>
                    <div className="faq-section accordion__title" data-section-key="item-1">
                      <span className="text-white">galeria de fotografias</span><span className="icon ">→</span>
                    </div>
                 
                </div>
                <div className="acordion_section">
                      <div className="faq-item faq-item--section-Bug-Fixing accordion__section Bug-Fixing" data-section-key="Bug-Fixing" >
                        <div data-section-key="Bug-Fixing1" className="accordion__question header">
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                            <p >
                              orçamento: { data?.filme.financiamento_orcamento }
                            </p>
                            <p >
                              { data?.filme.financiamento_financiadores}
                            </p>
                            {/* <div >
                              <img
                                v-for="(logo, index) in filme.acf.financiamento.logos"
                                className="img-responsive"
                                v-bind:src="logo.sizes.thumbnail"
                                fluid-grow
                                alt="logo.name"
                              />
                            </div> */}
                          </div>
                        </div>
                        </div>
          
                      </div>
              
       
              
             
                </div>
              </div>
               
        </div>
</div>


           

   

             
          
  
        </div>
      </div>
      
    </Layout>
  )
}


export default Page
