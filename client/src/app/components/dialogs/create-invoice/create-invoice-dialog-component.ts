import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, finalize, map, Observable, tap } from 'rxjs';
import { SubscriptionService } from '../../../services/subscripton.service';
import { Subscription } from '../../../interfaces/subscription.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
   selector: 'app-new-reading',
   standalone: true,
   providers: [provideNativeDateAdapter()],
   imports: [
      CommonModule,
      MatDialogContent,
      MatFormFieldModule,
      MatDialogActions,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatButtonModule,
      MatDatepickerModule
   ],
   templateUrl: './create-invoice-dialog-component.html',
   styleUrl: './create-invoice-dialog-component.scss'
})
export class CreateInvoiceDialogComponent implements OnInit {
   readonly dialogRef = inject(MatDialogRef<CreateInvoiceDialogComponent>);

   public subscriptions$!: Observable<Subscription[]>;
   public loading$ = new BehaviorSubject(true);

   public constructor(
      private fb: FormBuilder,
      private subscriptionService: SubscriptionService
   ) { }

   public invoiceForm = this.fb.group({
      subscription_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
   });

   public ngOnInit(): void {
      this.subscriptions$ = this.subscriptionService.getSubscriptions().pipe(
         map((subscriptions) => subscriptions.data),
         map((subscriptions) => subscriptions.filter((subscription) => subscription.is_active)),
         finalize(() => this.loading$.next(false))
      );
   }

   public save() {
      this.dialogRef.close(this.invoiceForm.value);
   }

   public cancel(): void {
      this.dialogRef.close(null);
   }
}
