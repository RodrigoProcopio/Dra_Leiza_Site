// Tipos compartilhados entre componentes

export interface Article {
  id: string;
  titulo: string;
  subtitulo?: string;
  resumo: string;
  conteudo: string;
  data?: string;
  link?: string;
  imagem?: string;
  publisher?: string;
  downloadLink?: string;
  download?: string;
  download_url?: string;
  isbn?: string;
  doi?: string;
  ano?: string;
  paginas?: string;
  palavrasChave?: string;
}

export interface ContactTranslation {
  titulo: string;
  descricao: string;
  agendamento: string;
  nome: string;
  email: string;
  mensagem: string;
  enviar: string;
  enviando: string;
  telefone: string;
  hospital: string;
  endereco: string;
  sucesso: string;
  erro: string;
  lgpd: string;
}

// Ease premium reutilizável — evita any nos componentes
export const easePremium: [number, number, number, number] = [0.2, 0.7, 0.2, 1];