
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected _http: HttpClient,
    @Inject(String) protected _url: string
  ) { }

  getItems() {
    return this._http.get<T[]>(`${this._url}/getUsers`);
  }

  getItemById(id: string) {
    return this._http.get<T>(`${this._url}/getUserById/${id}`);
  }

  saveItem(t: T) {
    return this._http.post(`${this._url}/newUser`, t);
  }

  updateItem(t: T , id : number) {
    return this._http.put(`${this._url}/updateUser`, t);
  }

  deleteItem(id: number) {
    return this._http.delete(`${this._url}/deleteUser/${id}`);
  }

}
