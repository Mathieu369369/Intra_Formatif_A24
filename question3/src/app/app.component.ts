import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, RouterModule]
})
export class AppComponent {
  formGroup: FormGroup;
  title = 'reactive.form';
  
   constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        roadnumber: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]],
        rue: ['', [Validators.required]],
        postalcode: ['', [Validators.required, Validators.pattern('^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$')]],
        comments: [''],
      },
    );
  }
}


