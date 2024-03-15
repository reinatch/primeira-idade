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
        <div className="fullpage-wp flex flex-col">
            <div className="page-1 page min-h-screen w-screen flex text-center justify-center items-end bottom-10 relative">
                <div className="thumbtexto-principal absolute w-full z-50 bottom-[1em] text-[white] uppercase m-0 p-0 text-center">
                  <h1 className="titulo-principal font-Favorit leading-[1.5em] font-thin">{ data?.filme.title }</h1>
                  <h2 className="realizador-principal font-Ogg text-[2.4em] leading-[0.5em] font-thin" >
                    { data?.filme.realizador }
                  </h2>
                  <div className="w-full flex justify-center">

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



            <div className="page-2 page min-h-screen w-screen">
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



            <div className="page-3 page min-h-screen w-screen">
                    <div className="info h-screen flex flex-wrap pt-[15vh] pl-[2.5em] pr-[2.5em] overflow-y-auto">
                    <Accordion multiple value={value} onChange={setValue} className="tab w-screen grid grid-cols-4" >
                      <Accordion.Item value="item-1" className="tab  flex-[1_0_25%]">
                        <Accordion.Control className="tab-header text-yellow-500"><h5>financiamento</h5></Accordion.Control>
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
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
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
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                      <Accordion.Item value="item-2" className="tab flex-[1_0_25%]">
                        <Accordion.Control className="tab-header"><h5>festivais</h5></Accordion.Control>
                        <Accordion.Panel>panel-2</Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>


                      <div className="tab max-w-[25vw] flex-[1_0_25%]">
                        <div className="tab-header">
                          <h5>premios</h5>
                        </div>
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content"></div>
                        </div>
                      </div>

                      <div className="tab max-w-[25vw] flex-[1_0_25%]"
                      >
                        <div className="tab-header" >
                          <h5>palavras sobre</h5>
                        </div>
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
                      </div>

                      <div className="tab max-w-[25vw] flex-[1_0_25%]"
                      >
                        <div className="tab-header" >
                          <h5>distribuicao comercial</h5>
                        </div>
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
                        </div>
                      </div>

                      <div className="tab max-w-[25vw] flex-[1_0_25%]"
                      >
                        <div className="tab-header" >
                          <h5>imprensa</h5>
                        </div>
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
                      </div>

                      <div className="tab max-w-[25vw] flex-[1_0_25%]"
                      >
                        <div className="tab-header" >
                          <h5>outros videos</h5>
                        </div>
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          <div className="tab-content">
                          {data?.outros_videos.map((outro:any) => (
                            <>
                              <a href={outro.link}> { outro.titulo }</a>
                            </>

                          ))}
                 
                          </div>
                        </div>
                      </div>

                      <div className="tab max-w-[25vw] flex-[1_0_25%]">
                        <div className="tab-header" >
                          <h5>cartaz do filme</h5>
                        </div>
                        <div className="tab-body p-0 overflow-hidden [transition:all_0.3s_ease]" >
                          {/* <div className="tab-content">
                            <img
                              className="img-responsive"
                              src="filme.acf.cartaz_do_filme.sizes.thumbnail"
                              fluid-grow
                            />
                          </div> */}
                        </div>
                      </div>

                      <div className="tab max-w-[25vw] flex-[1_0_25%]"
                      >
                        <div className="tab-header" >
                          <h5>galeria de fotogramas</h5>
                        </div>
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
                      </div>

                      <div className="tab max-w-[25vw] flex-[1_0_25%]" >
                        <div className="tab-header" >
                          <h5>galeria de fotografias</h5>
                        </div>
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
                      </div>
                    </div>

            </div>
        </div>
      </div>
      
    </Layout>
  )
}


export default Page
