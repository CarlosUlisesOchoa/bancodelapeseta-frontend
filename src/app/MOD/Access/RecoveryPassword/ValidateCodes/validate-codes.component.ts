
import { ValidationService } from '@/GENERIC/UTILS/validation.service';
import { WInputComponent } from '@/SHARED/Widgets/w-input/input-app';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import IForgoPasswordReq from '../ForgotPassword/interface/iForgoPasswordReq.interface';
import passwordRecoveryVerificationCodes from '../ForgotPassword/interface/passwordRecoveryVerificationCodes.interface';
import { VerificationService } from '../../Verification/service/verification.service';
import newPassword from '../ForgotPassword/interface/newPassword.interface';

@Component({
  selector: 'app-validate-codes',
  templateUrl: './validate-codes.component.html',
  standalone:true,
  imports:[CommonModule, WInputComponent, RouterLink, ReactiveFormsModule]
})
export default class PasswordRecoveryComponent implements OnInit {

  @ViewChildren('inputPhoneCodeRef', { read: ElementRef }) inputPhoneCodeRef!: QueryList<ElementRef>;
  @ViewChildren('inputEmailCodeRef', { read: ElementRef }) inputEmailCodeRef!: QueryList<ElementRef>;

  isButtonEnabled: boolean = false;
  emailCode: string = '';
  phoneCode: string = '';
  interfaceForgotPassword!: IForgoPasswordReq;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private verificationService: VerificationService,
  ) {}

  emailDigitsCode = this.formBuilder.group({});
  phoneDigitsCode = this.formBuilder.group({});

  inputConfigsPhone = [
    { name: 'numb1', type: 'digitCode' },
    { name: 'numb2', type: 'digitCode' },
    { name: 'numb3', type: 'digitCode' },
    { name: 'numb4', type: 'digitCode' },
    { name: 'numb5', type: 'digitCode' },
    { name: 'numb6', type: 'digitCode' }
  ];

  inputConfigsEmail = [
    { name: 'numb7', type: 'digitCode' },
    { name: 'numb8', type: 'digitCode' },
    { name: 'numb9', type: 'digitCode' },
    { name: 'numb10', type: 'digitCode' },
    { name: 'numb11', type: 'digitCode' },
    { name: 'numb12', type: 'digitCode' }
  ];

  ngOnInit(): void {
    this.phoneDigitsCode.valueChanges.subscribe(() => this.updateButtonState());
    this.emailDigitsCode.valueChanges.subscribe(() => this.updateButtonState());

    this.interfaceForgotPassword = JSON.parse(this.route.snapshot.params['interface'] as string) as IForgoPasswordReq
    console.log("TaxId: ", this.interfaceForgotPassword);

  }

  updateButtonState(): void {
    // Habilita el botón solo si ambos formularios son válidos
    console.log("Phone: ", this.phoneDigitsCode.valid);
    console.log("Email: ", this.emailDigitsCode.valid);
    console.log("Button enabled: ", this.isButtonEnabled);
    this.isButtonEnabled = this.phoneDigitsCode.valid && this.emailDigitsCode.valid;
  }

  onDigitInputPhoneCode(inputIndex: number, event: any) {
    console.log("inputIndex: ", inputIndex);
    console.log("event: ", event);
    const value = event.event.key;
    if (value.toString().length == 1) {
      this.validationService.onDigitInputFocusNext(inputIndex, this.inputPhoneCodeRef)
    }

  }

  onDigitInputEmailCode(inputIndex: number, event: any) {
    console.log("inputIndex: ", inputIndex);
    console.log("event: ", event);
    const value = event.event.key;
    if (value.toString().length == 1) {
      this.validationService.onDigitInputFocusNext(inputIndex, this.inputEmailCodeRef)
    }

  }

  sendCodes(){

    this.phoneCode = Object.values(this.phoneDigitsCode.value).join('');
    this.emailCode = Object.values(this.emailDigitsCode.value).join('');

    if(this.phoneCode.length == 0 || this.emailCode.length == 0 ){
      return
    }

    const sendCodes = {
      emailCode: this.emailCode,
      phoneCode: this.phoneCode,
      sign: "123456",
      taxId: this.interfaceForgotPassword.taxId
    }

  //   this.verificationService.verifyEmailAndPhoneCodePasswordRecovery(sendCodes as passwordRecoveryVerificationCodes, 'api/v1/auth/recovery/password/check/code').subscribe({
  //     next: (userData) => {

  //       const newPassword = {
  //         taxId: this.interfaceForgotPassword.taxId,
  //         recoveryCode: userData['recoveryCode'],
  //         newPassword: ''
  //       }

  //       this.router.navigate(['/recovery-change', JSON.stringify(newPassword as newPassword)], {skipLocationChange: true});
  //     },
  //     error: (err) => {
  //       console.error('Incorrect code: ', err);
  //     },
  //     complete: () => {
  //       // this.router.navigateByUrl('/email-verification');
  //     },
  //   })

  // }

    const newPassword = {
      taxId: this.interfaceForgotPassword.taxId,
      recoveryCode: 'aaa',
      newPassword: ''
    }

    this.router.navigate(['/recovery-change', JSON.stringify(newPassword as newPassword)], {skipLocationChange: true});
  }
}
