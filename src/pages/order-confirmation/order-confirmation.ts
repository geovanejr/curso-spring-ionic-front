import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {


  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public clienteService: ClienteService,
              public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.endereco = this.findEndereco(this.pedido.enderecoEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {

    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {

    return this.cartService.valorTotalCarrinho();
  }

  checkout() {

    this.pedidoService.insertPedido(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codPedido = this.extraiIdPedido(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          console.log("Erro de autenticação");
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  backHome() {

    this.navCtrl.setRoot('CategoriasPage');
  }
  extraiIdPedido(location: string) {

    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
