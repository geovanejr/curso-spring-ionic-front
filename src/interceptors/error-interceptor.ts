import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/fieldMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,
                public alertCtrl: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;

            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status) {
              case 401:
                this.handle401();
                break;
              case 403:
                this.handle403();
                break;
              case 422:
                this.handle422(errorObj);
                break;
              default:
                this.handleDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle401() {

      let alert = this.alertCtrl.create({
        title: 'Erro 401. Falha de autenticação',
        message: 'Email ou senha incorretos',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK'
          }
        ]
      });

      alert.present();

    }

    handle403() {

      this.storage.setLocalUser(null);
    }

    handle422(errorObj) {

      let alert = this.alertCtrl.create({
        title: 'Erro 422 - Validação',
        message: this.listErrors(errorObj.errors),
        buttons: [
          {
            text: 'OK'
          }
        ]
      });

      alert.present();
    }

    handleDefaultError(errorObj) {

      let alert = this.alertCtrl.create({
        title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message,
        enableBackdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
      alert.present();
    }

    private listErrors(messages: FieldMessage[]) : string {

      let s: string = '';

      for (var i = 0; i < messages.length; i++) {
        s = s + '<p><strong>' + messages[i].fieldName + '</strong>' + messages[i].message + '</p>';
      }

      return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
