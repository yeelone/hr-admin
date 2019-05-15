import { Observable, of } from 'rxjs';

export class Response {}

export class MyService{
    protected handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
          console.log("err", error);
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
     
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
     
      /** Log a HeroService message with the MessageService */
      protected log(message: string) {
        console.log("message",message);
      }
} 