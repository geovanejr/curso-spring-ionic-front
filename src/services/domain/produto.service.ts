import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable} from "rxjs/Rx";
import { EstadoDTO } from "../../models/estado.dto";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {

    }

    findByCategoria(categoria_id : String) {
        return this.http.get(`${API_CONFIG.baseURL}/produtos/?categorias=${categoria_id}`);
    }
}
