import { Component } from '@angular/core';
import { ProdutoService } from './services/produto.service';
import { CategoriaService } from './services/categoria.service';
import { Produto } from './models/produto';
import { Categoria } from './models/categoria';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ApiCatalogo';

  produto = {} as Produto;
  produtos: Produto[] = [];
 
  
  constructor(private produtoService: ProdutoService) {} 
  ngOnInit() {
    
    this.getProdutos();

  }
  
  saveProduto(form: NgForm) {
    if (this.produto.ProdutoId !== undefined) {
      this.produtoService.updateProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.produtoService.saveProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  SaveProduto(n: string){
    this.produto.Nome= n;
    this.produtoService.saveProduto(this.produto);
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe((produto: Produto[]) => {
      this.produtos = this.produtos;
    });
  }

  deleteProduto(produto: Produto) {
    this.produtoService.deletaProduto(produto).subscribe(() => {
      this.getProdutos();
    });
  }

  editProduto(produto: Produto) {
    this.produto = { ...produto };
  }

  cleanForm(form: NgForm) {
    this.getProdutos();
    form.resetForm();
    this.produto = {} as Produto;
    this.getCategorias();
    this.categoria = {} as Categoria;
  }

  categoria = {} as Categoria;
  categorias: Categoria[] = [];

  saveCategoria(form: NgForm) {
    if (this.categoria.CategoriaId !== undefined) {
      this.categoriaService.updateCategoria(this.categoria).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.produtoService.saveProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  SaveCategoria(n: string){
    this.produto.Nome= n;
    this.produtoService.saveProduto(this.produto);
  }

  getCategorias() {
    this.produtoService.getProdutos().subscribe((produto: Produto[]) => {
      this.produtos = this.produtos;
    });
  }

  deleteCategoria(produto: Produto) {
    this.produtoService.deletaProduto(produto).subscribe(() => {
      this.getProdutos();
    });
  }

  editCategoria(produto: Produto) {
    this.produto = { ...produto };
  }

  

}
