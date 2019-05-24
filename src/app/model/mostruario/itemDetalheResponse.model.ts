import { DadosImagem } from '../dadosImagem.model';
import { Categoria } from '../categoria.model';
import { RegraFiscal } from '../RegraFiscal.model';

export class ItemDetalheResponse{
  public codigo: number;
  public ean: number;
  public preco: number;
  public estoque: number;
  public descricaoMarcaPai: string;

  public codigoFabricante: number;
  public precoDe: number;
  public precoPor: number;
  public quantidade: number;
  public codigoPrincipioAtivo: number;
  public principioAtivo: string;
  public classeTerapeutica: string;
  public origemDesconto: string;
  public regraFiscal: RegraFiscal;
  public codigoTipoDoItem: number;
  public categoria: string;
  public codigoFilial: number;
  public vendaLiberada: boolean;
  public nomenclatura: string;
  public nomenclaturaDetalhada: string;
  public psicotropico: boolean;
  public retencaoReceita: boolean;
  public possuiGenericos: boolean;
  public lancamento: boolean;
  public possuiSimilares: boolean;
  public possuiAlternativos: boolean;
  public possuiSimilaresPorPrincipioAtivo: boolean;
  public possuiGenericosPorPrincipioAtivo: boolean;
  public possuiReferenciaPorPrincipioAtivo: boolean;
  public bloqueadoInternet: boolean;
  public situacaoItem: string;
  public advertencias: Array<string>;
  public farmaciaPopular: boolean;
  public multiAtendimento: boolean;
  public dadosImagens: DadosImagem;
  public categorias: Array<Categoria>;
  public linksVideo: Array<any>;
  public restricoes: Array<any>;
  public indicadorOtc: string;
  public geraDadosFornecedor: boolean;
  public permiteAdesao: boolean;
  public possuiKitAdesao: boolean;
  public exclusivoPanvel: boolean;
  public participaListaReferencial: boolean;
  public participaFarmaciaPopular: boolean;
  public participaPack: boolean;
  public promocaoAssinatura: boolean;
  public itemGeladeira: boolean;
  public possuiEanImpresso: boolean;
  public usoContinuo: boolean;
  public codigoMarcaPai: number;
  public itemAssinavel: boolean;
}