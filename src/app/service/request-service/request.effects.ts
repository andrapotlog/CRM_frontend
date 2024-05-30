import {Injectable} from "@angular/core";
import {catchError, Observable, switchMap} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {RequestService} from "./request.service";
import {ServiceRequestModel} from "./request.model";

import * as ServiceRequestActions from './request.actions';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class RequestEffects {
  loadServiceRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceRequestActions.loadServiceRequests),
      switchMap(() =>
        this.loadAll().pipe(
          switchMap((result) => [ServiceRequestActions.loadServiceRequestsSuccess({ payload: result })]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [ServiceRequestActions.loadServiceRequestsFailure({error: error.error})]
          })
        )
      )
    )
  );

  filterServiceRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceRequestActions.filterServiceRequests),
      switchMap(({filters}) =>
        this.filterRequests(
          filters.status,
          filters.priority,
          filters.city
        ).pipe(
          switchMap(result => [ServiceRequestActions.loadServiceRequestsSuccess({ payload: result })]),
          catchError((error: HttpErrorResponse) => [ServiceRequestActions.loadServiceRequestsFailure({ error: error.error })])
        )
      )
    )
  );

  createServiceRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceRequestActions.createServiceRequest),
      switchMap(({payload}) =>
        this.createRequest(payload).pipe(
          switchMap(() => [ServiceRequestActions.createServiceRequestSuccess({ payload })]),
          catchError((error: HttpErrorResponse) => {
            console.log(error)
            return [ServiceRequestActions.createServiceRequestFailure({error: error.error})]
          })
        )
      )
    )
  );

  updateServiceRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceRequestActions.updateServiceRequest),
      switchMap(({id, payload}) =>
        this.updateRequest(id, payload).pipe(
          switchMap(() => [ServiceRequestActions.updateServiceRequestSuccess({ payload })]),
          catchError((error: HttpErrorResponse) => {
            console.log(error)
            return [ServiceRequestActions.updateServiceRequestFailure({error: error.error})]
          })
        )
      )
    )
  );

  deleteServiceRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceRequestActions.deleteServiceRequest),
      switchMap(({id}) =>
        this.deleteRequest(id).pipe(
          switchMap(() => [ServiceRequestActions.deleteServiceRequestSuccess({ id })]),
          catchError((error: HttpErrorResponse) => {
            console.log(error)
            return [ServiceRequestActions.deleteServiceRequestFailure({ error: error.error })]
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private requestService: RequestService
    ) {}

  loadAll(): Observable<ServiceRequestModel[]> {
    return this.requestService.getServiceRequests();
  }

  filterRequests(
     status?: string,
     priority?: string,
     city?: string){
    return this.requestService.getServiceRequests(
      status,
      priority,
      city,
      /*startDate,
      endDate*/
    )
  }

  createRequest(payload: ServiceRequestModel) {
    return this.requestService.createServiceRequest(payload);
  }

  updateRequest(id: number, payload: ServiceRequestModel) {
    return this.requestService.updateServiceRequest(id, payload);
  }

  deleteRequest(id: number) {
    return this.requestService.deleteServiceRequest(id);
  }
}
