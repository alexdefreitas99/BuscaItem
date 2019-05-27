import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ItemResponse } from '../../model/item/itemResponse.model';
import { ItemResponseDetalhada } from '../../model/item/itemResponseDetalhada.model';
import { Item } from 'src/app/model/item/item.model';
import { ItemPost } from 'src/app/model/item/itemPost.model';
import { ConsultaRegrasFiscais } from 'src/app/model/any/consultaRegrasFiscais.model';
import { ItemService } from '../../services/itemService/item.service';
import { ItemResponseEstoque } from 'src/app/model/item/itemResponseEstoque.model';
import { ItemResponsePreco } from 'src/app/model/item/itemResponsePreco.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-busca-item',
  templateUrl: './busca-item.component.html',
  styleUrls: ['./busca-item.component.css']
})
export class BuscaItemComponent implements OnInit {

  listItemBase: Array<ItemResponse> = new Array<ItemResponse>();
  listItemDetalheResponse: Array<ItemResponseDetalhada> = new Array<ItemResponseDetalhada>();
  listItemEstoqueResponse: Array<ItemResponseEstoque> = new Array<ItemResponseEstoque>();
  listItemPrecoResponse: Array<ItemResponsePreco> = new Array<ItemResponsePreco>();
  item: ItemResponseDetalhada = new ItemResponseDetalhada();

  itemPesquisa: string;
  modalRef: BsModalRef;

  ngOnInit() { }

  constructor(private itemService: ItemService, private modalService: BsModalService, private toastr: ToastrService) { }

  buscaProduto(nome: string,
               codigoFilial = 1,
               maxResult = 40,
               ordenarRentabilidade = false,
               ordenarPreco = false) {
    if (nome.length > 2) {
      this.itemService.findByName(nome, codigoFilial, maxResult, ordenarRentabilidade, ordenarPreco).subscribe((
        response: []) => {
        this.listItemBase = response;
        this.getDetalhe();
      });
    } else {
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.toastrConfig.positionClass = 'toast-center-center';
      this.toastr.warning('Digite no mínimo três caracteres', 'Mensagem de aviso');
    }
  }



  openModal(template: TemplateRef<any>, item: any) {
    this.item = item;
    this.modalRef = this.modalService.show(template);
  }



  getDetalhe() {
    const itemDetalhePost: ItemPost = new ItemPost();
    itemDetalhePost.consultaRegrasFiscais = new ConsultaRegrasFiscais();
    itemDetalhePost.consultaRegrasFiscais.pais = 'BR';
    itemDetalhePost.consultaRegrasFiscais.paisDestino = 'BR';
    itemDetalhePost.consultaRegrasFiscais.uf = 'RS';
    itemDetalhePost.consultaRegrasFiscais.ufDestino = 'RS';
    itemDetalhePost.filial = 101;
    itemDetalhePost.perfil = 1;
    this.listItemBase.map(item => {
      const itemMap: Item = new Item();
      itemMap.codigo = item.codigoItem;
      itemDetalhePost.itens.push(itemMap);
    });
    this.itemService.findItemDetalhe(itemDetalhePost).subscribe((
      response: any) => {
      this.listItemDetalheResponse = response.itens;
      console.log(JSON.stringify(response.itens));
      this.listItemBase = new Array<ItemResponse>();
      this.getEstoque();
      this.getPreco();
    }) ;
  }

  getEstoque() {
    let parametros = new HttpParams();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.listItemDetalheResponse.length; i++) {
      parametros = parametros.append('itens', this.listItemDetalheResponse[i].codigo.toString());
    }
    const options = { params: parametros };
    this.itemService.findEstoqueByCodigo(options).subscribe((response: any) => {
      this.listItemEstoqueResponse = response;
    });
  }

  getPreco() {
    let parametros = new HttpParams();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.listItemDetalheResponse.length; i++) {
      parametros = parametros.append('item', this.listItemDetalheResponse[i].codigo.toString());
    }
    const options = { params: parametros };
    this.itemService.findPreco(options, 101, 1).subscribe((response: any) => {
      this.listItemPrecoResponse = response;
      this.adicionaPrecoAndEstoqueNaLista();
    });
  }

  adicionaPrecoAndEstoqueNaLista() {
    this.listItemDetalheResponse.forEach((item, i) => {
      const estoqueFiltrado = this.listItemEstoqueResponse.find((estoqueFiltro) =>
        estoqueFiltro.codigoItem === item.codigo
      );
      item.estoque = estoqueFiltrado.estoqueLoja;

      const precoFiltrado = this.listItemPrecoResponse.find((precoFiltro) =>
        precoFiltro.codigoItem === item.codigo
      );
      item.preco = precoFiltrado.preco;
    });
  }
}
