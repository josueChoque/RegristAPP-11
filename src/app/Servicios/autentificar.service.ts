import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

interface User{
  usernombre: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AutentificarService {
  public autentificado!: boolean;
  private _storage!: Storage;

  constructor(private storage: Storage, private router: Router) {
    this.init()
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async register( usernombre:string, password: string){
    const users = await this._storage?.get('users') || [];
    const existe = users.find((us: User) => us.usernombre === usernombre && us.password === password);
    if (existe) {
      console.log("Usuario Existente")
    } else {
      const nuevo: User = { usernombre, password };
      users.push(nuevo);
      await this._storage.set('users', users);
      console.log("Registro Exitoso")
    }
  }

  async login(usernombre: string, password: string): Promise<boolean>{
    const users: User[] = (await this._storage.get('users')) || [];
    const user = users.find((us: User)=> us.usernombre === usernombre && us.password === password);
    if (user){
      this.autentificado = true;
      return true;
    }
    this.autentificado = false;
    return false;
  }

  logout(){
    this.autentificado = false;
    this.router.navigate(['/login'])
  }
}
