import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from '../user.service';
export const normalCatLoverGuard: CanActivateFn = (route, state) => {
  let currentUser = inject(UserService).currentUser
  if (currentUser == undefined){
    return createUrlTreeFromSnapshot(route, ["/login"])
  }
  else{
      return true;
  }

};
