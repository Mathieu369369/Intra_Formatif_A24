import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
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
        postalcode: ['', [Validators.pattern('^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$')]],
        comments: ['', [mots(10)]],
      },
      { validators: NomDansCommentaire() }
    );
  }

}

export function mots(minWords: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const words = control.value.trim().split(" ");
    return words.length >= minWords ? null : { minWords: { required: minWords, actual: words.length } };
  };
}



export function NomDansCommentaire(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const comment = control.get('comments')?.value
    const nomCherche = control.get('name')?.value
    if (!comment || !nomCherche) {
      return null
    }
    const contientNom = comment.toLowerCase().includes(nomCherche.toLowerCase());

    if (comment.includes(nomCherche)) {
      return contientNom ? { NomDansCommentaire: true } : null
    }
    else return null
  }
}
