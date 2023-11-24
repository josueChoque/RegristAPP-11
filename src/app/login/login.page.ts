import { Component, OnInit,ElementRef ,ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AutentificarService } from '../Servicios/autentificar.service';
import { IonModal, IonCard, ActionSheetController, ToastController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal)modal!: IonModal;
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  passwordVisible: boolean = false;
  password: string = '';
  isRotated = false;
 
  public selectedRole: string = "Seleccionar rol";
  togglePasswordVisibility(){
    this.passwordVisible = !
    this.passwordVisible;
  }
  toggleRotation() {
    this.isRotated = !this.isRotated;
  }
  constructor( private modalController: ModalController, private router: Router, private auth: AutentificarService, private toastController: ToastController ,private actionSheetController: ActionSheetController) { }
  public mensaje = ""
  public alertaButtons = ['OK'];
  redirectToRestablecer(){
    this.router.navigate(['restablecer'])
  }
  redirectToProfesor(){
    this.router.navigate(['/profesor'])
  }
  user = {
    usuario: "",
    password: ""
  }
  userProfesor = {
    usuario: "",
    password: ""
  };

  informacionUsuario(){
    this.auth.login(this.user.usuario, this.user.password).then(()=> {
      if (this.auth.autentificado){
        let navigationExtras: NavigationExtras ={
          state: { user: this.user}
        }
        this.router.navigate(['/inicio'], navigationExtras);
      } 
    });
  }

  Consola(){
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != ""){
      this.mensaje = "";
    } else{
      this.mensaje = ""
    }
  }
  
  Salir(){
    this.modal.dismiss(null,'Salir');
  }
  confirmarUsuario(){
    this.auth.register(this.user.usuario, this.user.password);
    this.modal.dismiss(this.user.usuario, 'confirmarUsuario');
  }
  /*async confirmarProfesor() {
    const credencialesCorrectas = await this.auth.autenticarProfesor(
      this.userProfesor.usuario,
      this.userProfesor.password
    );
  
    if (credencialesCorrectas) {
      await this.modalController.dismiss();
      this.router.navigate(['/profesor']);
    } else {
      console.log('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  }*/

  ngOnInit() {
  }
  roleChanged() {
    console.log("Rol seleccionado:", this.selectedRole);
    // Puedes realizar acciones adicionales según el rol seleccionado aquí
  }
  // seleccion de rol si es profesor o alumno
  async toggleRole() {
    const toast = await this.toastController.create({
      duration: 2000,
      position: 'bottom'
    });

    const options = [
      { label: 'Alumno', value: 'alumno' },
      { label: 'Profesor', value: 'profesor' }
    ];

    const actionSheetButtons = options.map(option => {
      return {
        text: option.label,
        handler: () => {
          this.selectedRole = option.label;
          toast.message = `Rol seleccionado: ${this.selectedRole}`;
          toast.present();
        }
      };
    });

    const actionSheet = await this.actionSheetController.create({
      buttons: actionSheetButtons
    });

    return await actionSheet.present();
  }
}
