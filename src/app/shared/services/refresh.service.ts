import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  public onTokenRefresh: Subject<void> = new Subject();

  tokenRefreshed(){
    this.onTokenRefresh.next()
  }

}
