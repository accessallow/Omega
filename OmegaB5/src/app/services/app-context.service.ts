import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  contextMap:   Map<string,any> = new Map<string,any>();

  public put(key:string,value:any){
    this.contextMap.set(key,value);
  }

  public read(key:string):any{
    return this.contextMap.get(key);
  }

  public clearAll(): void{
    this.contextMap.clear();
  }

  public has(key:string): boolean{
    return this.contextMap.has(key);
  }

  public clear(key:string): boolean{
    return this.contextMap.delete(key);
  }
}
