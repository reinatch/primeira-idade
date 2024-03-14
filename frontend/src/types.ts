 interface Thumbnail {
  id: number;
  file: string;
  _file_size: number;
  sha1: string;
  has_all_mandatory_data: boolean;
  original_filename: string;
  name: string;
  description: string;
  uploaded_at: string;
  modified_at: string;
  is_public: boolean;
  mime_type: string;
  _height: number;
  _width: number;
  _transparent: boolean;
  default_alt_text: string;
  default_caption: string;
  subject_location: string;
  date_taken: string;
  author: string;
  must_always_publish_author_credit: boolean;
  must_always_publish_copyright: boolean;
  polymorphic_ctype: any; // Define type as needed
  folder: any; // Define type as needed
  owner: any; // Define type as needed
}

interface Photos {
  // Define properties as needed
}

export interface Movie {
  id: number;
  title: string;
  readOnly: true;
  category: string;
  enum: string[];
  sinopse: string;
  trailer: string;
  ano: string;
  genero: string;
  suporte: string;
  duracao: string;
  budget: string;
  com: string;
  vozes: string;
  equipa_argumento: string;
  equipa_producao: string;
  equipa_realizacao: string;
  ficha_tecnica_ano: string;
  ficha_tecnica_duracao: string;
  ficha_tecnica_genero: string;
  ficha_tecnica_suporte: string;
  financiamento_financiadores: string;
  financiamento_orcamento: string;
  updated: string;
  created_at: string;
  galery: Photos | null;
  videodrop: string;
  video_page: string;
  slug: string;
  thumbnail: Thumbnail;
}