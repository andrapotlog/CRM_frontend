import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../service/payments/payment-service/payment.service';
import { Observable } from 'rxjs';
import {
  CardInformation,
  Payment,
  Template,
} from '../../service/payments/payment.model';
import { Nullable } from '../../../global.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from '../../service/payments/cards-service/card.service';
import { TemplateService } from '../../service/payments/template-service/template.service';
import { SavedCardsDialogComponent } from './saved-cards/saved-cards-dialogue.component';
import { SavePaymentDialogComponent } from './save-template/save-payment-dialog.component';
import { Store } from '@ngrx/store';
import { loadTemplates } from '../../service/payments/template-service/template.actions';
import { loadPayments } from '../../service/payments/payment-service/payment.actions';
import { loadCards } from '../../service/payments/cards-service/card.actions';
import { selectTemplates } from '../../service/payments/template-service/template.reducer';
import { selectCards } from '../../service/payments/cards-service/card.reducer';
import { selectPayments } from '../../service/payments/payment-service/payment.reducer';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  templates$: Observable<Nullable<Template[]>> =
    this.store.select(selectTemplates);
  cards$: Observable<Nullable<CardInformation[]>> =
    this.store.select(selectCards);
  payments$: Observable<Payment[]> = this.store.select(selectPayments);

  isTemplateSelected: boolean = false;
  newTemplate: boolean = false;

  paymentForm: FormGroup;

  cvvLength = 3;

  isCardNumberSelected = false;
  isCardNameSelected = false;
  isCardExpSelected = false;
  isCardCvvSelected = false;

  constructor(
    private store: Store,
    private paymentService: PaymentService,
    private cardService: CardService,
    private templateService: TemplateService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    // this.templates$ = templateService.getTemplates();
    // this.cards$ = this.cardService.getCardsDetails();
    // this.payments$ = this.paymentService.getPayments();
    this.store.dispatch(loadTemplates());
    this.store.dispatch(loadPayments());
    this.store.dispatch(loadCards());

    this.paymentForm = fb.group({
      recipientName: new FormControl('', [Validators.required]),
      recipientAccountNumber: new FormControl('', [Validators.required]),

      billNumber: new FormControl('', [Validators.required]),

      amount: new FormControl(0, [Validators.required]),

      description: new FormControl(''),

      cardNumber: new FormControl('', [Validators.required]),
      expiration: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.minLength(this.cvvLength),
        Validators.maxLength(this.cvvLength),
      ]),
      ownerName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.cards$.subscribe((res) => console.log(res));
    this.templates$.subscribe((res) => console.log(res));
    this.payments$.subscribe((res) => console.log(res));
  }

  openSavedCardsDialog() {
    const dialogRef = this.dialog.open(SavedCardsDialogComponent, {
      width: '400px',
      data: { savedCards$: this.cards$ },
    });

    dialogRef.afterClosed().subscribe((card) => {
      if (card) {
        // Autofill the form with the selected card data
        this.paymentForm.patchValue({
          cardNumber: card.card_number,
          expiration: card.expiration,
          ownerName: card.ownerName,
        });
      }
    });
  }

  onSubmitPayment(/*template: Template*/) {
    if (this.paymentForm.valid) {
      //console.log(template);
      console.log(this.paymentForm.value);
      this.paymentService.savePayment({
        ...this.paymentForm.value,
      });
    }

    if (this.newTemplate) {
      const dialogRef = this.dialog.open(SavePaymentDialogComponent, {
        width: '600px',
        data: {
          recipientName: this.paymentForm.controls['recipientName'].value,
          recipientAccountNumber:
            this.paymentForm.controls['recipientAccountNumber'].value,
          templateName: '',
        }, // Pass payment data to the dialog
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Handle the saved template (e.g., update your saved cards array)
        }
      });
    }

    this.paymentService.getPayments();
    this.templateService.getTemplates();
  }

  proceedToPayment(template: Nullable<Template>) {
    this.isTemplateSelected = true;
    this.paymentForm.controls['recipientName'].reset();
    this.paymentForm.controls['recipientAccountNumber'].reset();
    if (template) {
      this.paymentForm.patchValue({
        recipientName: template.recipientName,
        recipientAccountNumber: template.recipientAccountNumber,
      });
    } else {
      this.newTemplate = true;
    }
    console.log(template);
  }

  getCardImgPath() {
    if (this.isCardNumberSelected)
      return 'assets/images/card-highlight-number.png';
    else if (this.isCardNameSelected)
      return 'assets/images/card-highlight-name.png';
    else if (this.isCardExpSelected)
      return 'assets/images/card-highlight-exp.png';
    else if (this.isCardCvvSelected)
      return 'assets/images/card-highlight-cvv.png';
    else return 'assets/images/card-basic.png';
  }

  downloadInvoice(invoiceId: string) {
    this.paymentService.getInvoice(invoiceId);
  }

  /*onCardSelection(card: CardInformation) {
    this.selectedCard = card;

    this.paymentForm.patchValue({
      cardNumber: card.number,
      expiration: card.expiration,
      cvv: card.cvv,
      ownerName: card.ownerName,
    });

    this.showSavedCards = false;
  }*/
}
