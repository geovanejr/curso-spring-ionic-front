import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable} from "rxjs/Rx";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {

    }

    findById(produto_id: string) {

      return this.http.get<ProdutoDTO>(`${API_CONFIG.baseURL}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id : String, page : number = 0, linesPerPage : number = 12) {
        return this.http.get(`${API_CONFIG.baseURL}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getImageFromBucket(id : string) : Observable<any> {

      let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
      return this.http.get(url, {responseType: 'blob'})
    }

    getSmallImageFromBucket(id : string) : Observable<any> {

      let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
      return this.http.get(url, {responseType: 'blob'})
    }
}
