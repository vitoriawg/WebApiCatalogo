import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import{Observable, throwError} from 'rxjs';
import { retry, catchError} from 'rxjs/operators'
import { Categoria } from '../models/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'https://localhost:7174/api/Categorias';

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
   getCategoria(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(this.url)
    .pipe(
      retry(2), catchError(this.handleError)  )
  }

  // Obtem um produto por id
  getCategoriasById(id:number):Observable<Categoria>{
    return this.httpClient.get<Categoria>(this.url + '/' + id)
    .pipe(
      retry(2),
        catchError(this.handleError)
    )
  }

  //salva um produto
  saveCategoria(categoria: Categoria) : Observable<Categoria>{
    return this.httpClient.post<Categoria>(this.url, JSON.stringify(categoria), this.httpOptions)
    .pipe(
      retry(2),
        catchError(this.handleError)
    )
  }

  //atualiza 
  updateCategoria(categoria: Categoria) : Observable<Categoria>{
    return this.httpClient.put<Categoria>(this.url + '/' + categoria.CategoriaId, JSON.stringify(categoria),
    this.httpOptions)
    .pipe(
      retry(1),
        catchError(this.handleError)
    )
  }

  //deleta 
  deletaCateogria(categoria: Categoria){
    return this.httpClient.delete<Categoria>(this.url + '/' + categoria.CategoriaId)
    .pipe(
      retry(1),
        catchError(this.handleError)
    )
  }

  // add
  addCategoria(categoria: Categoria){
    console.log(this.url, JSON.stringify(categoria))
    return this.httpClient.post<Categoria>(this.url, JSON.stringify(categoria))
    .pipe(
      retry(2),
        catchError(this.handleError))
  }
}