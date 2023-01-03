import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import{Observable, throwError} from 'rxjs';
import { retry, catchError} from 'rxjs/operators'
import { Produto } from '../models/produto';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  url = 'https://localhost:7174/api/Produtos';

  constructor(private httpClient: HttpClient) { }
  //headers 
  httpOptions={
    headers: new HttpHeaders({'Content Type': 'application/json'})
  }
  
  //manipulação de erros
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //erro ocorreu do lado do client
      errorMessage = error.error.message;
    }else{
      //erro do lado do servidor
      errorMessage = 'Codigo do erro: ${error.status},' +
      'mensagem: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }
  //obtem todos produtos 
  getProdutos(): Observable<Produto[]>{
    return this.httpClient.get<Produto[]>(this.url)
    .pipe(
      retry(2), catchError(this.handleError)  )
  }

  // Obtem um produto por id
  getProdutosById(id:number):Observable<Produto>{
    return this.httpClient.get<Produto>(this.url + '/' + id)
    .pipe(
      retry(2),
        catchError(this.handleError)
    )
  }

  //salva um produto
  saveProduto(produto: Produto) : Observable<Produto>{
    return this.httpClient.post<Produto>(this.url, JSON.stringify(produto), this.httpOptions)
    .pipe(
      retry(2),
        catchError(this.handleError)
    )
  }

  //atualiza 
  updateProduto(produto: Produto) : Observable<Produto>{
    return this.httpClient.put<Produto>(this.url + '/' + produto.ProdutoId, JSON.stringify(produto),
    this.httpOptions)
    .pipe(
      retry(1),
        catchError(this.handleError)
    )
  }

  //deleta 
  deletaProduto(produto: Produto){
    return this.httpClient.delete<Produto>(this.url + '/' + produto.ProdutoId)
    .pipe(
      retry(1),
        catchError(this.handleError)
    )
  }

  // add
  addPessoa(produto: Produto){
    console.log(this.url, JSON.stringify(produto))
    return this.httpClient.post<Produto>(this.url, JSON.stringify(produto))
    .pipe(
      retry(2),
        catchError(this.handleError))
  }

}