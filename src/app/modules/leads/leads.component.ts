import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  subscribe: Subscription
  currUser$: User;
  allUsers$;
  stockDetails$ = null;
  leads:User[];

  constructor(private userService: UserService) { }

  leadsToShow() {
    return (this.allUsers$.filter((user: User) => {
      return !this.currUser$.contacts
        .some(contact => user.id === contact.id)
    })
    )
  }

  drop(event: CdkDragDrop<User[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit(): void {
    this.userService.loadUsers()
    this.subscribe = this.userService.currUser$.subscribe(res => { this.currUser$ = res; })
    this.subscribe = this.userService.users$.subscribe(res => { this.allUsers$ = res })
    this.leads = this.leadsToShow()
  }

}
