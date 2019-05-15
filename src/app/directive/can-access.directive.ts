import { Directive ,Input,OnInit, OnDestroy,TemplateRef,ViewContainerRef} from '@angular/core';
import { PermissionService } from '../service/permission.service';
import { Permission } from '../model/permission';
import { User } from '../model/user';
import { Role } from '../model/role';

@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective  implements OnInit, OnDestroy{
  @Input('appCanAccess') appCanAccess: string[];

  permissions: Permission[] = [];
  authorized:boolean = false ;
  accessMap = {};
  service = null ;
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private permissionService: PermissionService) {
  }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();
    let ps = JSON.parse(localStorage.getItem('permissions')) || {} ;
    
    let role: Role;
    if (Object.keys(currentUser).length ){
      if (  currentUser.roles.length ){
        role = currentUser.roles[0];
      }
    }
    if ( Object.keys(ps).length  ){
      this.accessMap = ps ;
      this.applyPermission();
      return ;
    }

    if ( !role ) return ;
    this.service = this.permissionService.getPermission(role.id)
      .subscribe(
        response => {
          if (response['code'] === 200 ){
            this.permissions = response['data']['fields'];
            for(let k1 in this.permissions){
              for ( let k2 in this.permissions[k1]){
                if (this.permissions[k1][k2]['checked']){
                  this.accessMap[this.permissions[k1][k2]['id']] = true; 
                }
              }
            }
            localStorage.setItem('permissions', JSON.stringify(this.accessMap));
            this.applyPermission();
          }else{
            this.authorized = false ; 
            console.log(response['message'])
          }
        },
        err => {console.log(err)}
      )
  
  }

  private applyPermission(): void { 

    for(let key of this.appCanAccess){
      if ( this.accessMap[key] ){
        this.authorized = true; 
      }
    }
    
    if (this.authorized) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
  }

  ngOnDestroy(): void {
    if ( this.service) {
      this.service.unsubscribe();
    }
    
  }

}
