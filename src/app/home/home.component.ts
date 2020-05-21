import { Component, OnInit } from '@angular/core';
import { NavigationModel } from '../model/navigation.model';
import { FolderStructureService } from '../services/folder-structure.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  list: NavigationModel[];
  showInput: boolean;
  selectedItem;
  currentWorkingDirectory = '/';

  form = new FormGroup({
    folderTitle: new FormControl('', Validators.required)
  });

  constructor( private folderService: FolderStructureService) {
  }

  get folderTitle() {
    return this.form.get('folderTitle');
  }


  ngOnInit() {
    this.list = this.folderService.getList();
  }

  toggleClass(item, event) {
    item.isActive = !item.isActive;
    this.currentWorkingDirectory = item.title;
    event.stopPropagation();
  }


  onSelect(item: NavigationModel): void {
    this.selectedItem = item;
    this.showInput = true;
    this.form.reset();
  }

  addItem() {

    if (this.selectedItem.children.some(el => el.title === this.folderTitle.value)) {
      alert(`The folder name ${this.folderTitle.value} already exists`);
      return;
    }
    this.selectedItem.isActive = true;
    this.currentWorkingDirectory = this.selectedItem.title;
    this.showInput = false;
    this.folderService.addToList(this.selectedItem, this.folderTitle.value);
  }
}
