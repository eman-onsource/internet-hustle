import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { BehaviorSubject, filter, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { Invoice } from '../../interfaces/invoice.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateInvoiceDialogComponent } from '../dialogs/create-invoice/create-invoice-dialog-component';

@Component({
   selector: 'invoices',
   standalone: true,
   imports: [
      CommonModule,
      MatButtonModule
   ],
   templateUrl: './invoices.component.html',
   styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {
   private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
   public invoices$ = this.invoicesSubject.asObservable();
   public loading$ = new BehaviorSubject(true);

   constructor(
      public invoiceService: InvoiceService,
      private dialog: MatDialog,
   ) { }

   public ngOnInit(): void {
      this.invoiceService.getInvoices().pipe(
         map((invoices) => invoices.data),
         finalize(() => this.loading$.next(false))
      ).subscribe((invoices) => this.invoicesSubject.next(invoices));
   }

   public createInvoice() {
      const dialogRef = this.dialog.open(CreateInvoiceDialogComponent);
      dialogRef.afterClosed().pipe(
         filter((formValue) => formValue !== null),
         switchMap((result) => this.invoiceService.createInvoice(result)),
      ).subscribe((newInvoice) => {
         const currentInvoices = this.invoicesSubject.value;
         this.invoicesSubject.next([...currentInvoices, newInvoice.data]);
      });
   }

   public pay(invoice: Invoice) {
      this.invoiceService.pay(invoice.id).subscribe(() => invoice.is_paid = true);
   }
}
