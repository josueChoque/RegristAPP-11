import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private authGuard: AuthGuard, private alertController: AlertController) { }
  public user = {
    usuario: "",
    password: ""
  }
  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    this.activatedRouter.queryParams.subscribe(()=>{
      let state = this.router.getCurrentNavigation()?.extras.state;
      if(state){
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    this.mostrarMensajeRegistroExitoso();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async mostrarMensajeRegistroExitoso() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Registrado exitosamente',
      buttons: ['OK'],
    });
    await alert.present();
  }
 
}
