import { Injectable } from '@angular/core';
import { NavigationModel } from '../model/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class FolderStructureService {

  public list: NavigationModel[] = [
  {
    title: '/',
    isActive: false,
    children: []
  }];

  constructor() { }

  getList() {
    return this.list;
  }

  addToList(node, item) {
     node.children.push({title: item, isActive: false, children: []});
  }


}
