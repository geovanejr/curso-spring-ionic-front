import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page: number = 0;
  qtdLinhasPorPaginas = `${API_CONFIG.qtdLinhasPorPaginas}`;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService: ProdutoService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

    this.loadDados();

  }

  loadDados() {

    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();

    this.produtoService.findByCategoria(categoria_id, this.page, parseInt(this.qtdLinhasPorPaginas))
      .subscribe(response => {

        let imagemInicial = this.items.length;
        this.items = this.items.concat(response['content']);
        console.log("Qtde itens: " + this.items.length);
        let imagemFinal = this.items.length - 1;
        loader.dismiss();
        console.log("ImagemInicial: " + imagemInicial);
        console.log("ImagemFinal  : " + imagemFinal);
        this.loadImageUrls(imagemInicial, imagemFinal);
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(imagemInicial: number, imagemFinal: number) {

    for (var i=imagemInicial; i<=imagemFinal; i++) {
      let item = this.items[i];

      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imagemUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
        error => {});
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor, aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {

    this.page = 0;
    this.items = [];
    this.loadDados();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinete(infiniteScroll) {

    this.page++;
    this.loadDados();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
